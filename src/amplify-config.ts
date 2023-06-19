const amplifyConfig = {
  aws_cognito_region: process.env.REACT_APP_AWS_REGION,
  aws_user_pools_id: process.env.REACT_APP_AWS_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_AWS_CLIENT_ID,
};

export default amplifyConfig;
