0:34 - Adam Harris 
What's up? All right. I'm getting a look at my calendar. I'm realizing something today. I've got this build running right. Great. Time.

0:56 - Brad Taylor 
So first thing, I guess,

1:00 - Brad Taylor 
What are the challenges or why can't they get the starter running? I have. Or medium monks or whatever.

1:16 - Adam Harris 
I don't know. I mean have looked. See, I mean, it could be environment keys, not running in VMUs. Shit like that. I don't know why they're even, I don't know why they're pushing back. They're like, we want to use yours. I'm like, fucking just get it done. You guys are worried about getting it done on your own shit.

1:55 - Brad Taylor 
I'm 99% sure that they're now making the same calculation that I made, which is like, let's let them because then we can blame it if they don't hit their date. That's when I want to make sure if they're having trouble because like the way he ended it, well, we couldn't get it done. We don't know this, blah, blah, blah. They're going to use that as a fucking reason to do it. And I'm like, look, we're very clear. Use your own thing. This is a development branch.

2:20 - Adam Harris 
Yeah, obviously, yeah, like,

2:26 - Brad Taylor 
You want to go in there and do it. We told you from the beginning, you can just give us a Figma file. So anyway, this will hopefully maybe solve this. So basically what I want to do, I'm breaking into three sections, four sections. First, I want to go through step-by-step how to get it up and running locally. What are the prerequisites? What are the build commands? Just literally, even if the readme is there, just read the readme. If it is right, let's go through that process of starting a brand new one.

3:08 - Brad Taylor 
Make sure that we have everything there. That's one. Number two, a brief update on, or how do you add styles, right? What are the specific files? What are the specific ways with themes, with these? How do you use a different, if you wanted to use, like, I don't know how material is, how intertwined it is to these, if they can be swapped out with different CSS, go over that. But the styling piece, right? So like me as a user, I want to style a hero. What do I do? Same thing for extensions. I want to create a data extension.

3:51 - Brad Taylor 
What do I do? And then I want to go through each of the components.

3:58 - Adam Harris 
The notes are.

4:00 - Brad Taylor 
Not the components, but each of the content models. And field by field, just quickly, this field does this. And then say, like, if you use any, like, oh, it always uses the H1, or this uses a P, or this is a, whatever specific things around it, the functionality around it, something that's going to be helpful in the help text, or if someone asks a question, how do I do this, it becomes in the source data. So does that make sense?

4:35 - Adam Harris 
It makes sense.

4:37 - Brad Taylor 
So let's first start. 1st.

4:39 - Adam Harris 
I think. The only thing is like, Max and I haven't fully decided what we're going to put back in. So I'm just going to use TA Reality because it's cleaner and much more in line with the what will probably be in there.

4:59 - Brad Taylor 
Okay, that's fine. Whatever we want to start with, this is and if we say TA Realty is the starter of that, I want to, I don't want to sit on this, right? I want to open source it and then put it back in there. I think there's some things that we can do with like, we don't need to marry the content model and the components. Like I was looking at MediaMonks, they have like over almost a thousand components, right? But the data model doesn't need to change for all those. So I think there's some things, but I don't want to get into those discussions now.

5:31 - Brad Taylor 
Let's just start with, okay, if I wanted to start, get this running locally, what do I do? As a human.

5:46 - Adam Harris 
Clone the repo? Well, you would run the, you could run the CLI command once it's updated to pull that over. It'll. Create.

5:58 - Brad Taylor 
What's. The L. I. Command?

6:03 - Adam Harris 
Whatever the documentation. The last last row of libraries package CLI. What's it called?

6:56 - Brad Taylor 
So I'm going to do one thing real quick. I'm going to leave.

7:00 - Adam Harris 
All right.

7:02 - Brad Taylor 
I'm going to join with my Mac and follow along. I'm actually going to leave this me. I'll be right back. Up. All right, I think my PC is about ready to freaking melt down anyway. I'm training a fine-tuned version of Mixedrel, this new model that uses a chain of experts type model that basically is open source. And like, it's interesting. It like takes the user's intent and then it has like eight experts to choose from So it'll go get the information from the two and then use it to synthesize it from it.

8:44 - Brad Taylor 
So like, it's a very, it's a new open AI model, but basically there's a dolphin version that you can literally just completely uncensored, like whatever you want it to do. So I'm doing a fine tune model to dolphin lobotomize it. Um,

9:05 - Adam Harris 
So.

9:10 - Brad Taylor 
Let me pull up You slap me the repo. Is it just last read libraries? A Particular branch you want.

9:34 - Adam Harris 
Would you? The name. On.

9:36 - Brad Taylor 
Me to grab?

9:41 - Adam Harris 
It is called, example extracolumna. Bye. Branches. Peter slash starter dash p.m. P.m. We don't have the This is what we're going to do. Get it in.

10:35 - Brad Taylor 
Let's just go through and verify that this is actually correct documentation. If that's here, then what?

10:41 - Adam Harris 
It's not correct. It's like it hasn't been up. This create app has not been updated.

10:47 - Brad Taylor 
Well then. Exactly so. Well, if create app hasn't been updated, it will be updated when. But so if you don't do that, if you just download it, the starter, right?

11:06 - Adam Harris 
Yeah, basically.

11:09 - Brad Taylor 
Everything else is fine.

11:13 - Adam Harris 
Yes. Should be able to go in, we have all the environment keys.

11:20 - Brad Taylor 
Question, it says it's still using Yarn and NPM. Are we using Yarn or PNP?

11:25 - Adam Harris 
It's using PNPM now.

11:28 - Brad Taylor 
Let's update that. And I'm going to go through, select me the, or is it features, code, branch.

11:39 - Adam Harris 
Feature starter PNPM. Send you my environment variables, keyb. We haven't tried this. Yeah, but it should work. You have Keybase installed, right? Brad Taylor, Ella, right, That's the new, that's the new one.

12:40 - Brad Taylor 
I'll send you a message.

13:10 - Adam Harris 
Sure you're saying I explain.

13:12 - Brad Taylor 
Yeah. Or I show your screen, actually? So so this is t real Teas, right? And this is just so that we have something with content in it. What is our source of truth right now? What's Contentful Space? It's our source of truth for the content models.

13:38 - Adam Harris 
It is the, there's an environment.

13:59 - Brad Taylor 
Can I put this in the next starter. Root folder?

14:07 - Adam Harris 
You can share your screen. Sorry, I have like 8,000 fucking windows open at the moment. I'm not sure what's going on with it.

14:17 - Brad Taylor 
So I've done the next starter cleanup feature branch. Here's my ENV key now. So replace it with a new one? Assume mean? Why aren't you working? I swear. I'm becoming OS ambidextrous with going between PC and...

14:50 - Adam Harris 
We're gonna need to switch out those things.

14:56 - Brad Taylor 
These?

14:57 - Adam Harris 
We're gonna need to switch out... Keys might still work, but...

15:07 - Brad Taylor 
I'm sorry. I didn't understand you.

15:08 - Adam Harris 
Sorry. Scroll up a bit. We got to switch out on a couple IDs, like the site settings and stuff. So change.

15:20 - Brad Taylor 
Oh, to use the actual starter repo. Space. Okay.

15:27 - Adam Harris 
Change where it says site equals TA reality. Change that to starter underscore anything.

15:38 - Brad Taylor 
What is this used for what is the site and variable environment used for environment variable used for in the code.

15:46 - Adam Harris 
If there are multiple sites. If, if somebody has multiple sites running under one contentful environment or space, then this is what is used to kind of filter out and pick the right one.

16:04 - Brad Taylor 
And that is set in the site settings content model?

16:07 - Adam Harris 
Yeah, there's a site key field. That's a dropdown that's set there, so.

16:14 - Brad Taylor 
So domain.

16:18 - Adam Harris 
What's that? That?

16:19 - Brad Taylor 
Domain. Domain.

16:24 - Adam Harris 
You have the cha? I don't think you have to change.

16:26 - Brad Taylor 
Say what it is. We're documenting this.

16:30 - Adam Harris 
Domain is wherever this app is running, the domain needs to match the URL that it'll be hosted on.

16:38 - Brad Taylor 
If you're running it locally, it needs to be localhost 3000. If you're running it in staging or production, it needs to be the root of that domain, correct?

16:47 - Adam Harris 
Great.

16:49 - Brad Taylor 
Used?

16:51 - Adam Harris 
This is used throughout the code to watch the different changes to the code while you're running dev. It's used to put into the site map. Anywhere that the domain would be referenced. I think it's important that this matches that environment.

17:16 - Brad Taylor 
Default site ID.

17:19 - Adam Harris 
That is the content item ID of the site content item in Contentful.

17:28 - Brad Taylor 
What is stored in the site settings?

17:30 - Adam Harris 
There is the site key, there's the header, the footer, global SEO, rewrites, Reference field, redirect reference field. And a user could add any other custom fields that they wanted in here that would be global across the site.

17:57 - Brad Taylor 
And how is default site used? Site ID used?

18:02 - Adam Harris 
Used to pull it in the site settings. So that way we can do want to hard code it to avoid an extra query. It needs to be very specific. We don't want somebody accidentally changing it.

18:17 - Brad Taylor 
But if there's multiple ones, it's a default site ID. So this is the one that defaults to if not supplied, or how does that, how does the default work?

18:26 - Adam Harris 
Default is so they don't have to select it for every page. If somebody has a setup where the page has to do a multiple sites, this is a way for them to not have to select site every single time they create a page.

18:39 - Brad Taylor 
Okay. Contentful space ID, that's the space of the Contentful instance, the Contentful ENV, that's the environment that you're wanting to run it on. Does the Contentful environment... So we have Contentful space ID, Contentful ENV, Contentful use preview equals true. What does that mean?

19:03 - Adam Harris 
So this will pull draft content as well as published content. If this was false, it would only pull published content.

19:12 - Brad Taylor 
So we have the Contentful preview token for preview content, the Contentful delivery token that is only going to return published content. Then we have next public Contentful ENV, and that's master, next public Contentful space ID, and the same space ID. Is there a way that those can be different, and what is the difference between the two? Between Contentful Space ID and Next Public Contentful ENV.

19:45 - Adam Harris 
Next, anything that's prefixed with next public, Next.js will allow it to be shown, used on the client side. The values, I can't think of any use cases where the values of like the next public environment and the regular Contentful environment key would be different.

20:09 - Brad Taylor 
So Captcha site key?

20:16 - Adam Harris 
This is specific to TA Realty, but if somebody was using like reCAPTCHA in this case, that's just a standard using the environment variables to store anything that needs to be secret.

20:29 - Brad Taylor 
Okay. So, you would... So, any new environment variables that you want to store on the server can just be that name. But if you preface it with next underscore, then it becomes a public key that can be used on in the, in the client side, JavaScript in next, correct? All right. The GraphQL environment variables. So we have GraphQL underscore server, underscore URL.

21:00 - Adam Harris 
So this is the, when you're running the GraphQL server, either through Yarn dev or just by itself, this is the server URL that it will be running on. So this is important to have. If this is not there, then it won't be able to start up the server. Or if it does, it won't have a standard address that can be referenced throughout the code. For API requests, functions, things like that.

21:33 - Brad Taylor 
Graph server timeout.

21:37 - Adam Harris 
How long the timeout is in milliseconds before it will stop trying to process queries. You wanna keep this, 30,000 is pretty high. Generally, we would set it lower, but this is safer. 5,000 might be more appropriate.

21:59 - Brad Taylor 
Five seconds. Graph QL runner strategy.

22:05 - Adam Harris 
This is used for where it should pull the content from So this is using Read to pull the content. And this is also set, used in the next, or the lastRefConfig.

22:25 - Brad Taylor 
What are the other strategies that can be added here, values? Can we look in the code?

22:34 - Adam Harris 
It's going to be in the libraries. But it's FS for file system and CMS. Fs.

22:52 - Brad Taylor 
For file system so you could just read GraphQL from the file system, so it creates the... Which is locally.

23:03 - Brad Taylor 
And then CMS, what does CMS do? It's directly to the CMS?

23:10 - Adam Harris 
Yes, that's correct. So Contentful in this case.

23:13 - Brad Taylor 
So the purpose of the Read caching layer. So this gives you the option to run your GraphQL from it locally on using your file system directly from Contentful or using the Read, which enhances speed improvements. Okay, so let's talk about Redis setup. Read Toast.

23:39 - Adam Harris 
So this is the last rev Redis endpoint. So we use upstash to store all the Redis data that's pulled from Contentful when we use Read in order to avoid more rate limit issues going directly from Contentful. So we have the host, and then we also need the port and the password. Currently, these don't change.

24:08 - Brad Taylor 
And you can use any Read provider that you would like, We use Upstash here at LastRev. SYNGrid API key. So is there a SYNGrid component and service that we use that's standardized? Not.

24:26 - Adam Harris 
Standardized at the moment, but for the, this is being used on TA Realty as a server, serverless.

24:35 - Brad Taylor 
Customers out of it. Cause I want to, I don't want to have to like get all this. Ca I. To. Be. In there?

24:40 - Adam Harris 
If. You. Haven't, If there's not a standard SendGrid implementation, but we have set it up to have serverless functions that do send emails, either through webhooks triggering them on the front end, this API key is used. About it. Log.

25:02 - Brad Taylor 
Level.

25:06 - Adam Harris 
I can't remember all the different levels here but debug is what you would like to want to use on your local the majority of the time this is going to give you the highest level the most feedback on any issues, a lot more consoles logs are going to appear.

25:24 - Brad Taylor 
Next public GTM ID. This is the good like Google Tag Manager ID. So Google Tag Manager is built into the header, correct?

25:33 - Adam Harris 
Correct. Is where you would set the ID.

25:37 - Brad Taylor 
Yep. So then I'm assuming chromatic project token, is that specific? That's about.

25:49 - Adam Harris 
That one. Ask him.

25:55 - Brad Taylor 
Preview token.

25:58 - Adam Harris 
So the preview route is expecting basically like a secret to be passed to it from Contentful. So this is where you would set this value here as well as setting it in your Contentful previews URLs.

26:19 - Brad Taylor 
So it's to help protect your preview URLs from just without that token. Or like live editing and stuff.

26:33 - Adam Harris 
Pas, Max. That's. There as well.

26:34 - Brad Taylor 
Okay.

26:35 - Adam Harris 
I'm guessing it is.

26:37 - Brad Taylor 
So we also have a Algolia integration. And if you want to use our Algolia piece, you can set the Algolia environment variables, which include Algolia admin API key, the Algolia index name, the Algolia index draft content. What's that?

26:58 - Adam Harris 
If you have this set to false, then Algolia will only index content that has been marked as published. If you have it set to true, then it will index draft content as well. Recommend avoiding that or making sure you have a separate index.

27:20 - Brad Taylor 
So then we have the Algolia search API key and the Algolia application ID. Both of those are also public environment variables because those are used for the search and retrieval of the data. Whereas the Algolia admin API key is used for the indexing jobs of indexing the content from Contentful for search. All right, what do I need to do to...

27:54 - Adam Harris 
Also one more in here. So there's the Sentry keys there. So if you have Sentry set up for any like error tracking, logging, you can set up the different tokens here that you can get from your Sentry admin settings.

28:14 - Brad Taylor 
So we have next public sentry DSN. This is for the client side DSN, which you can get out of sentry, sentry auth token, sentry URL, sentry org, and sentry project.

28:29 - Adam Harris 
And then if you scroll down a little bit, there's also an analyze bundle. So if analyze bundle is set to true, you would only want to do this on your local environments, this will open up like a webpack analyzer tool that shows you the size of all the different packages that have been imported, all the chunks for your site.

28:57 - Brad Taylor 
So if you were debugging speed issues and bundle sizes, set the analyze underscore bundle environment variable to true.

29:09 - Adam Harris 
Correct.

29:12 - Brad Taylor 
Um percy token.

29:18 - Adam Harris 
That would be the token that you need in order to to run Percy.

29:26 - Brad Taylor 
And we use Percy for screenshot automated testing. Cypress base URL.

29:34 - Adam Harris 
I'm not 100% sure, other than I believe that is what the value of it would be, but I believe it would be the same as your domain.

29:54 - Brad Taylor 
All right, so any other environment variables or are we done with environment variables?

29:58 - Adam Harris 
We're good.

30:01 - Brad Taylor 
We are done with environment variables. We are moving on to running the environment live. Very clear.

30:19 - Brad Taylor 
So, Got the starter.

30:30 - Adam Harris 
So if you, first thing.

30:31 - Adam Harris 
I'll point out, you go to the.nvmrc file. This is where the node version will be set.

30:43 - Brad Taylor 
Is that right?

30:44 - Adam Harris 
It's not, it's not right. Cause we haven't merged everything back in. That's the thing, but we will be running on node 20.

30:54 - Brad Taylor 
All right. Uh, we will be running on node 20, but the NVM. So the very first thing I need to do after I've downloaded my, I've cloned the repo. I have cd'd into examples, last ref dash next dash starter. Now I need to Percy.

31:16 - Adam Harris 
Want to do is run npm use. And then PNPM I.

31:31 - Brad Taylor 
E-n-p-m-i to install. It's configured to use yarn.

31:42 - Adam Harris 
In the right branch.

31:44 - Brad Taylor 
Next starter cleanup. No.

31:52 - Adam Harris 
Twenty one what if the origin feature started PM.

32:40 - Brad Taylor 
I delete this. It is installing all of the dependencies.

33:44 - Adam Harris 
So the nice thing about PMPM is that it does a really good job of caching all the different package versions. And I believe across your device. So if you've installed popper js one point sixteen point one be four they will be able to have that cache and be able to like reuse that. Getting past by anytime there's any updates to packages, especially working across multiple projects that are using PMPM it's significantly faster. All right, what does this say?

34:36 - Brad Taylor 
Can you hear that?

34:37 - Adam Harris 
Ain't it a swim?

34:40 - Brad Taylor 
So I ran into an error that says PubLogin TypeScript rollup. It's complaining about the SDK GraphQL client endpoint. Bayes directory must be absolute and

35:12 - Brad Taylor 
Ensure that J Sc dot base Url is special. Correctly.

35:21 - Adam Harris 
You're not running a journey. The local Imp. Can you go to your environment variables?

35:59 - Brad Taylor 
Do you use chat inside here, the co-pilot chat?

36:05 - Adam Harris 
No, my copilot, I didn't realize why I was sucking so bad. And then I realized like I only had the labs installed, not the core ones. So it was like trying to like, kept on trying to like refactor my entire file and then screwing it all up. I was like, Jesus, it's horrible. But yeah, so I got it sorted out. We have a deploy URL.

36:43 - Brad Taylor 
Oh yeah, deploy URL at the bottom.

36:59 - Adam Harris 
May I sent your line right?

37:02 - Brad Taylor 
It was commented out I maybe perhaps because if I'm reading, I'm, I'm doing mine inside of last rep libraries versus you doing it in its own repo. Are you doing it inside of last rep libraries to.

37:23 - Adam Harris 
My own repo, but Let's this doesn't work. Let's try one other thing.

37:31 - Brad Taylor 
Looks like it's working.

37:34 - Adam Harris 
What did you just run?

37:39 - Brad Taylor 
P N Pm I.

37:44 - Adam Harris 
And she just do that?

37:46 - Brad Taylor 
Yeah, and it failed.

37:47 - Adam Harris 
Oh. Ok,

37:48 - Brad Taylor 
That's when we got. The air.

37:50 - Adam Harris 
Oh, I'll tell you this doesn't work. Try something else because it might be.

38:11 - Brad Taylor 
Yep. Same problem.

38:13 - Adam Harris 
Okay. So can you open, close this and then open in VS code, just the last rep next starter folder, or maybe like its own window. Well, it shouldn't matter.

38:36 - Brad Taylor 
That won't matter because, like, I mean... I could do a terminal window and do the same thing.

38:44 - Adam Harris 
I don't know why it's trying to run something. And when you're in the last round, next turn, right? Can you collapse that folder real quick? Oh, go to last for next order PM PM.

39:54 - Brad Taylor 
Okay, make sure you're in the right project.

39:59 - Adam Harris 
This won't be. And they'll only be one or be never to be exported on its own repo.

40:09 - Brad Taylor 
Yeah, I know.

40:17 - Adam Harris 
Like what trying to do. You can see here it says reused. This is significantly faster than Yarn. If you had done this with Yarn, you would have to redownload everything again.

40:39 - Brad Taylor 
Cool. All right. So we see a bunch of pluses for the dev dependencies. Everything got done. Great. How do I start this?

40:48 - Adam Harris 
You want to run pnpm dev. Your window's a little cut off on the bottom. I can't see when you're type, really, when you're typing.

41:06 - Brad Taylor 
It has the whole thing. I think it's just the...

41:12 - Adam Harris 
I can see the top half of the letters.

41:24 - Brad Taylor 
Okay, I ran into an error. Quote base fragment. Looks like a lot of fragment issues.

41:37 - Adam Harris 
But it's running. Hope.

41:50 - Brad Taylor 
Nope nope it's not. I went to local host 3000.

41:55 - Adam Harris 
So that would probably cancel it.

41:59 - Brad Taylor 
Um, I guess it failed to request the API GraphQL. So we have fragment issues here. It looks like when I try to generate it, there's.

42:16 - Adam Harris 
An error. There's an error in your fragments that won't be able to start the GraphQL. So I should fix those first.

42:25 - Brad Taylor 
So how do you debug your fragment issues?

42:34 - Adam Harris 
You can either look at those logs. I can do PMPM space GQL. Colon logs, and that'll open up, you do that in a new terminal, and that'll open up any gql, refql-specific logs.

43:03 - Brad Taylor 
What was the, what was it?

43:06 - Adam Harris 
Pnpm GQL colon logs.

43:11 - Brad Taylor 
Pnpm GQL colon logs. And that will get you the specific logs for just the GraphQL server.

43:26 - Adam Harris 
So if you're debugging your extensions, I think you should see this here.

43:45 - Brad Taylor 
Oh, and then if you go to one two seven dot zero dot zero dot one colon 8888, you will go to the Apollo sandbox.

43:56 - Adam Harris 
Yes, I see a problem in your environment variables. Change the environment. Since it's not a master, you will do master dash starter dash V2. Okay.

43:59 - Brad Taylor 
Okay,

44:18 - Adam Harris 
Let's try running our dev again and see what happens. Scroll up.

44:36 - Brad Taylor 
Looks to have.

45:21 - Adam Harris 
Scroll back up to the fragment is 1st. Go into your, you want to fix this right now, right?

45:52 - Brad Taylor 
I want to get it run locally, yes, because I want to be able to actually execute the digital at scale based off of this.

46:02 - Adam Harris 
Make sure here. You which is important. I'm not getting the quote. Oh wait, collection expandable item for can never contact can never a quote. Pg. You go into collection expandable item fragment Do this for now. Comment out the quote face fragment. Put a hashtag in front of it I'm going to find the Aren't you? Module out fragment.

48:59 - Brad Taylor 
Coming out the quote ones.

49:36 - Adam Harris 
Just changed that quote fragment GraphQL to. Or isn't it like... Hey man, this is probably the problem actually. So anytime you have an error. We're going to scroll. To the top and see if the, whatever, the 1st see if there's any other air. So in this particular case, it cannot find this environment in this space I. Great environment.

51:09 - Brad Taylor 
Is that API key not have access to that environment?

51:16 - Adam Harris 
No, we didn't update the space thing. When it's on this team, you can update it. I can't paste from mine, Turn. Zoom chat, so let's switch out the Contentful space.

51:41 - Brad Taylor 
I'm going to undo the Zoom chat. That's the space ID? Yeah. If.

52:05 - Adam Harris 
This doesn't work, I can check the keys.

52:13 - Brad Taylor 
Well, if you gave me, I mean, the keys are probably different too. Let's just check them real quick.

52:20 - Adam Harris 
Yeah, they are. May, I can send you this. This is most of what we're going through right now is actually what that Create app does. Once you authorize it and stuff like that, this is all, it can create the space for you, all that stuff. Did you put the new ones in there?

53:29 - Brad Taylor 
Oh, did you send me new keys?

53:32 - Brad Taylor 
I sent them on Keybase. You Damn it. Using my PC for too much. Keep copying it and then getting control instead of command.

54:00 - Adam Harris 
So take note. Or Max. The contentful space cannot be found, it cannot connect for any reason. We should kill the process instead of trying to continue.

54:21 - Brad Taylor 
Yes.

54:22 - Adam Harris 
I think you're missing something at the beginning of the preview token. Lower case dd and an adapt.

54:35 - Brad Taylor 
Forget the little d here.

54:39 - Adam Harris 
No, on the other one. The other day, I copy and pasted environment keys in for camera, and there was like an asterisk or something in there, and it removed it, thinking that it was like a bold symbol or something like that. Just sort of figure that out. All right, let's go to the top, but you had some other things. Is this the new ones? Can you hit command or control C? And run it again. So now it'll be easier to find the beginning.

55:39 - Brad Taylor 
Well, I had done that, but yeah, it looks like it's using the same tokens. It hits, it goes through there. Zero items successful. 26 items successful.

56:19 - Adam Harris 
So there's things that are happening simultaneously. So there are times in the GraphQL server would not be available person. And it's on a time, basically on it.

56:33 - Brad Taylor 
These look good. And then centuries disabled air. Huh, might be working.

56:43 - Adam Harris 
Well, until he fetch your request to localhost Api graphic will failed the Wrong version number.

56:49 - Brad Taylor 
It's. Is it because this log is running over here?

56:55 - Adam Harris 
No, but you don't have anything else.

57:01 - Brad Taylor 
I'm just going to kill...

57:06 - Adam Harris 
Anything else running in like the flow wise or answer is a I want right now.

57:09 - Brad Taylor 
I'll do kill all node and do it again but yeah it's no. So these types of debugging situations, please start recording and putting these transcripts in here because. Will create helps and how to.

57:36 - Adam Harris 
Le Star Rigs. Try to go to Https. That's not correct.

57:47 - Brad Taylor 
Oh, this is it say that in the

57:55 - Adam Harris 
Oh, oh, comment that out. Comment that out. You So there's logic that's checking. For what the deploy URL is, like if it's, and it'll append the HTTPS if it's there, but we're doing it locally, so the fallback will be your GraphQL server URL. The paths that the GraphQL server lives on are different, depending on whether you're on Vercel or Netlify or local. I'm getting somewhere.

58:33 - Brad Taylor 
All right, I'm in. Ish with airs. Yeah,

58:39 - Adam Harris 
It's running well. Yeah.

58:43 - Brad Taylor 
All right. So this is this. So that issue was that one, the deploy URL environment variable needs to be commented out when running locally. Two, we had to make sure that the Contentful connection was correct. That's why it wasn't getting the right content model, which was causing the fragment. To error. So if you're having fragment errors and you don't see an error in your fragment, then check to make sure that it's connecting to Contentful first.

59:22 - Adam Harris 
One more thing here that I'm not sure if we did or not. Can you cancel this right here and then run Nus. No, that's right, I get. I don't know if this is an issue or not.

59:56 - Brad Taylor 
And now where is, has it just not even been started yet? It's just not ready about the CLI package. What's that status?

1:00:07 - Adam Harris 
Has not been started yet. I mean,

1:00:09 - Brad Taylor 
Hasn't. Been started yet,

1:00:09 - Adam Harris 
It's. The update hasn't been started yet.

1:00:14 - Brad Taylor 
Okay. And what is the plans for that?

1:00:18 - Adam Harris 
The next step is to merge back in whatever we feel like is best for the starter boilerplate, clean up any readmes and whatever else that are coming out of this, and then getting that setup updated. So we'll likely have a V2 of it. We'll have to make a decision internally. Like, do we even want the old one or not?

1:00:50 - Brad Taylor 
Okay. My only request is that the module that's done that does the cloning and all that stuff be done in a way that could be both inserted into the CLI, but also into a web service. So extract, like basically a web service that passes that same information or the CLI, which passes it. So the module should be called the same. Okay.

1:01:20 - Adam Harris 
This is so you can run it from the web.

1:01:23 - Brad Taylor 
I want to be able to deploy a new project from the web with Contentful space and all of these environment variables, like just connect these things. Or add these keys in.

1:01:42 - Adam Harris 
Yeah, it'll do that for you when you run it on CLI.

1:01:48 - Brad Taylor 
But it'd be nice to have, or not just a nice to have, but an requirement to get this because the ultimate goal is to make it so that you can deploy a brand new app and then eventually then pieces on that app. So from a web service. All right, let's, all right, we're done with getting it running locally. So to recap, to get it running locally, clone the repo, then use nvm use to ensure you have are using the correct version of node then type p n p m I and that will Essentially, download all of your dependencies.

1:02:37 - Brad Taylor 
Then type pnpm dev and that will start your dev server. The issues we encountered were the GraphQL fragments were not being built correctly. That was due to a misconfiguration in the Contentful a connection. And we had another issue that we encountered before that.

1:03:12 - Adam Harris 
That was all user, we put the wrong environment variables.

1:03:16 - Brad Taylor 
It was all it was all wrong environment variables. So double check your environment. If you can't get it running locally. All right, next piece. So now that I have this running locally, I want a overview of the styling system or the, I guess I should say the, let's start with the, let's start with the packages that are in here and a high level of what each one of these does.