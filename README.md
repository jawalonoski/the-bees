# "The Bees" Pollen Forecast for Amazon Echo

A simple AWS Lambda (http://aws.amazon.com/lambda) function that demonstrates a pollen forecasting skill for the Amazon Echo using the Alexa SDK and the Weather Underground (http://www.www.wunderground.com).

Currently the skill uses a default zip code (10001), or the user can provide a zip code in the
current session (limited testing).
The Alexa SDK terms of service do not currently allow skills to store identifying information by user, which
means we are not allowed to store their location and use that data on subsequent invocations.

## Setup
To run this example skill you need to do three things. The first is to pull and build the code. Second, deploy the example code in AWS Lambda, and finally configure the Alexa skill to use your AWS Lambda function.

### Build

    git clone https://github.com/jawalonoski/the-bees.git
    cd the-bees/src/
    npm install cheerio

Edit the `location` variable in `src/debug.js` (line 22) and in `src/index.js` (line 59) to your local
zip code and then test the app

    node debug.js

The script should report the forecasted pollen level for the current day.

Finally, zip all the contents of the `src` folder for deployment to AWS Lambda.


### AWS Lambda Setup
1. Go to the AWS Console and click on the Lambda link. Note: ensure you are in `us-east` or you won't be able to use Alexa with Lambda.
2. Click on the Create a Lambda Function or Get Started Now button.
3. Name the Lambda Function "thebees".
4. Go to the the src directory, select all files and then create a zip file, make sure the zip file does not contain the src directory itself, otherwise Lambda function will not work.
5. Upload the .zip file to the Lambda
6. Keep the Handler as index.handler (this refers to the main js file in the zip).
7. Create a basic execution role and click create.
8. Return to the main Lambda page, and click on "Actions" -> "Add Event Source"
9. Choose Alexa Skills Kit and click submit.
10. Click on your Lambda function name and copy the ARN to be used later in the Alexa Skill Setup

### Alexa Skill Setup
1. Go to the Alexa Console (https://developer.amazon.com/edw/home.html) and click Add a New Skill.
2. Set "The Bees" as the skill name and "the bees" as the invocation name, this is what is used to activate your skill. For example you would say: "Alexa, ask the bees for the pollen forecast."
3. Select the Lambda ARN for the skill Endpoint and paste the ARN copied from above. Click Next.
4. Copy the Intent Schema from the included
`speechAssets/IntentSchema.json`.
5. Copy the Sample Utterances from the included `speechAssets/SampleUtterances.txt`. Click Next.
6. [optional] go back to the skill Information tab and copy the appId. Paste the appId into the `src/index.js` file for the variable `APP_ID`,
then update the lambda source zip file with this change and upload to lambda again, this step makes sure the lambda function only serves request from authorized source.
7. You are now able to start testing your sample skill! You should be able to go to the Echo webpage (http://echo.amazon.com/#skills) and see your skill enabled.
8. In order to test it, try to say some of the Sample Utterances from the Examples section below.
9. Your skill is now saved and once you are finished testing you can continue to publish your skill.

## Examples
    User: "Alexa, ask the bees for the pollen forecast."
    Alexa: "The pollen level today is moderate."

## License

Copyright 2015 jawalonoski@github.com Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
