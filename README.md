![Click Me!](https://github.com/henryngann/CoLab/blob/main/src/media/CoLab_logo_blue.png)

<br>

![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript)
![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)
![Git](https://img.shields.io/badge/-Git-black?style=flat-square&logo=git)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3)
![Bootstrap](https://img.shields.io/badge/-Bootstrap-563D7C?style=flat-square&logo=bootstrap)
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg)
![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github)

<br>

## NSBEHacks UofT - Best Overall Hack Award

CoLab enables you to workout with others, following a synced [YouTube video](https://www.youtube.com/watch?v=qOpNcLoXoKs&feature=youtu.be) or creating a custom workout plan that can be fully dynamic and customizable. This is a synchronous video platform that uses Twilio Video,React, Node.js and Bootstrap.

## **Click the Picture for a Video Demo!**

[![Click Me!](https://github.com/henryngann/CoLab/blob/main/src/Custom%20Workout%20Participant%20View.jpg)](https://www.youtube.com/watch?v=qOpNcLoXoKs&feature=youtu.be)

In August 2020, **53%** of US adults reported that their mental health has been negatively impacted due to worry and stress over coronavirus. This is **significantly higher** than the 32% reported in March 2020. 

That being said, there is no doubt that Coronavirus has heavily impacted our everyday lives. Quarantine has us stuck inside, unable to workout at our gyms, practice with our teams, and socialize in classes.
Doctor’s have suggested we exercise throughout lockdown, to maintain our health and for the release of endorphins.

But it can be **hard to stay motivated**, especially when we’re stuck inside and don’t know the next time we can see our friends.

Our inspiration comes from this, and we plan to solve these problems with **CoLab.**

## How we built it

The UX/UI process began with preliminary research, finding the pain points of users and statistical data. With this the team ideated ways of providing a solution, and CoLab’s idea was born. Mid-fidelity wireframes were created in Figma, then the high-fidelity to follow.

Our technologies include: Twilio Programmable Video API, Node.JS and React.

## Challenges we ran into

At first, we found it difficult to resize the Video References for local and remote participants. Luckily, we were able to resize and set the correct ratios using Flexbox and Bootstrap's grid system. 

We also needed to find a way to mute audio and disable video as these are core functionalities in any video sharing applications. We were luckily enough to find that someone else had the same issue on [stack overflow](https://stackoverflow.com/questions/41128817/twilio-video-mute-participant) which we were able to use to help build our solution.

## Accomplishments that we're proud of
When the hackathon began, our team started brainstorming a ton of goals like real-time video, customizable workouts, etc. It was really inspiring and motivating to see us tackle these problems and accomplish most of our planned goals one by one.

## What's next for CoLab
Our team will continue developing the CoLab platform and polishing it until we deem it acceptable for publishing. We really believe in the idea of CoLab and want to pursue the idea further. We hope you share that vision and our team would like to thank you for reading this verbose project story! 

## Preparing the application

To run the application you will need a [Twilio account](https://www.twilio.com/try-twilio) and Node.js and npm installed. Start by cloning or downloading the repo to your machine.

```bash
git clone https://github.com/henryngann/CoLab
cd hackathonproject
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file by copying the `.env.example`.

```bash
cp .env.example .env
```

### Credentials

You will need your Twilio Account SID, available in your [Twilio console](https://www.twilio.com/console). Add it to the `.env` file.

You will also need an API key and secret, you can create these under the [Programmable Video Tools in your console](https://www.twilio.com/console/video/project/api-keys). Create a key pair and add them to the `.env` file too.

## Running the application

Once you have completed the above you can run the application with:

```bash
npm run dev
```

This will open in your browser at [localhost:3000](http://localhost:3000). Enjoy!

## Check out our devpost!
[Click Me!](https://devpost.com/software/colab-qfjwod)
