process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
import {
  PutRuleCommand,
  CloudWatchEventsClient,
  PutTargetsCommand,
  ListRulesCommand,
  ListRulesCommandInput,
  CloudWatchEventsClientConfig,
} from '@aws-sdk/client-cloudwatch-events';

export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const getReturnUrl = (): string => {
  const server = process.env.SERVER || 'domain';
  if (server.toLowerCase() == 'localhost') {
    return 'http://localhost:3000/verified';
  } else {
    return 'http://galaxi-ui.s3-website-us-east-1.amazonaws.com/';
  }
};

export const getRefreshUrl = (): string => {
  const server = process.env.SERVER || 'domain';
  if (server.toLowerCase() == 'localhost') {
    return 'http://localhost:3000/';
  } else {
    return 'http://glaxi-ui.s3-website-us-east-1.amazonaws.com/';
  }
};

export const createRule = async () => {
  const aws_region = process.env.region;
  const access_key_id = process.env.accessKeyId;
  const secret_access_key = process.env.secretAccessKey;

  const cweClient = new CloudWatchEventsClient({
    region: aws_region,
    credentials: {
      accessKeyId: access_key_id,
      secretAccessKey: secret_access_key,
    },
  } as CloudWatchEventsClientConfig);
  const ruleName = 'ScheduleRecommendationsEvent';
  const ruleCommand = {
    NamePrefix: ruleName,
  } as ListRulesCommandInput;
  const listRules = await cweClient.send(new ListRulesCommand(ruleCommand));
  let ruleResponse = null;
  const currentData = (new Date().getHours() + 1).toString();
  const cronExpression = `rate(1 hour)`;
  if (listRules.Rules.length == 0) {
    const scheduleParams = {
      Name: ruleName,
      // RoleArn: 'arn:aws:iam::119610914560:role/addscheduled',
      // RoleArn: 'arn:aws:iam::657141637168:role/scheduleLambda',
      RoleArn: 'arn:aws:iam::358814708264:role/scheduleLambda',
      ScheduleExpression: cronExpression,
      State: 'ENABLED',
    };
    const targetParams = {
      Rule: ruleName,
      Targets: [
        {
          // Arn: 'arn:aws:lambda:us-east-1:119610914560:function:ApplyScheduleRecommendations-develop',
          Arn: 'arn:aws:lambda:us-east-1:358814708264:function:ApplyScheduleRecommendations-staged',
          Id: 'ApplyScheduleRecommendations-staged',
        },
      ],
    };
    const scheduleData = await cweClient.send(new PutRuleCommand(scheduleParams));
    const targetData = await cweClient.send(new PutTargetsCommand(targetParams));
    if (scheduleData.$metadata.httpStatusCode == 200 && targetData.$metadata.httpStatusCode == 200) {
      console.log('Successfully Scheduled', scheduleData.$metadata, targetData.$metadata);
      ruleResponse = {
        rule: 'AWS Rule Successfully Scheduled',
      };
    }
  } else {
    console.log('Scheduled Cron Job Already Exists ', listRules.Rules);
    ruleResponse = {
      rule: 'Already Scheduled',
    };
  }
  return ruleResponse;
};
