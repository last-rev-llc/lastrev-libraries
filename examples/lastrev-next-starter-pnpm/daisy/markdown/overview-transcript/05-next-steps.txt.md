3:28:18 - Adam Harris 
First.

3:28:19 - Brad Taylor 
Off, awesome. My only feedback on it is I think we really need to think about like, do you really need Hero or can it just be a block? Because everything you talked about can be done in the extensions depending on its thing and just make it easier because I hate that you kind of like have to have like pretty much the same configuration for different things and I can't use like my blocks in that hero sometimes like like things that I have down here I was like I just want to have that up there I don't want to use what's up there And those are my only options.

3:28:57 - Brad Taylor 
And a lot of time, heroes are required. And I'm like, well, then I can't, like,

3:29:04 - Adam Harris 
Well, heroes, so in the new, like what I did for TA Realty, which I want to talk with Max about, but like hero, TA Realty has like this content that goes below the hero. Like it's in the hero, but it's below it. Basically, they have like a collection of like stats that's in there. And like we can like add it in a block but then like block. We start overloading all these different content types, so like, well no.

3:29:39 - Brad Taylor 
It just becomes a different, I mean it's, its position has a, I don't know, we can have that discussion later, we don't have it now, but that's the only thing,

3:29:47 - Brad Taylor 
But anything else, I mean, like, I think that's everything, I mean, I like all the decisions, I think it makes sense to, you know, separate out the collection, the dynamic, the collect, I'd probably say collection card, I mean, I guess it's not really technically, that's why it's collection, but yeah, I think using the blocks, the, yeah, I think this is a fantastic, And

3:30:13 - Adam Harris 
There's the things that. Are just hard to do. I don't think it's just contentful, but like, there's a lot of like repeated fields, you know, that I think we could turn into extensions, things like, like that anchor ID for the anchor name and stuff. Like that could just be an extension. Like it could be a content model. You know, But I.

3:30:41 - Brad Taylor 
If you add an anchor ID to it, just do it in the extension. I mean, that's the yeah.

3:30:47 - Adam Harris 
Like have like, okay, here's this or like, here's the the background color stuff. You know. You know, we have like a config for things that aren't going to be localized, basically. It's like I just just put it in there, like, I don't want to localize, like, I don't care about any of that, like, that is our app. And so, like, okay, we just set it up. So, like, on block, these are the colors that can be chosen or whatever, because not every color is the same across all of them. There's not necessarily the options, but I don't want to have to create a content model for it, necessarily.

3:31:25 - Adam Harris 
Oh,

3:31:28 - Brad Taylor 
Um, yeah, good work. I think it's going to be great. I'm going to take this and I'm going to then transcribe it per each of those sections. And then I'm going to put it as part of the training bot because like, I want to go into Rippling with like this, like fucking just killer demo. I want to basically bore birds this, this, this break. Basically, I want to solve our issues with our, figure out where our knowledge gaps are while building a demo for Rippling, while getting ourselves set up for IIS, while getting a demo ready for when we go out to Boston.

3:32:11 - Brad Taylor 
So I have all the infrastructure in place now. So my checklist is, first thing I'm writing, which I'm already almost done with, it wasn't that, took me like about 30 minutes, is a bulk file analysis automation. I don't know if you saw that research assistant thing that I put into general but That thing is so fucking badass.

3:32:35 - Adam Harris 
Dude.

3:32:37 - Brad Taylor 
I've like been tweaking this thing I made it so that it'll basically I give it like hey I'm trying to find Like I told you about the agenda anyway. So basically I'm using it in this bulk file analysis automation. So basically I can like load all of like any documents, right? Whether it comes from JIRA, whether it comes from whatever it is and analyze it for one thing bulk. So sorry if our open AI bill goes up a little bit this month. Um, I'm going to do it on our JIRA stuff first. I'm going to be like, Hey, what are like the common questions that are asked?

3:33:15 - Brad Taylor 
Like, what are the common tasks that are being asked? I just would love to know that. But that's going to be exactly within a demo that I show Rippling support person like, hey, we'll just do it to your Salesforce. We have a loader for this, right? So that's going to be the next thing that I develop is a Contentful as a data loader. I was looking at that flow-wise. I mean, it's gonna be very easy to create a data loader for that. That can be used then for in the demo for all of our customers, like, hey, one click chatbot integration.

3:33:50 - Brad Taylor 
It's easy to use your website as a source for your chatbot now. If time I'm going to explore the salesforce.com support one to see if there's like a quick and dirty way to like do like an API if they have an open API one, but we'll see. And then it goes into the things we've got to like actually demo or in there. So a spreadsheet analysis bot, which I pretty much already have in the playground, a male attachment automation. So something that actually just looks at an attachment and then processes it in some way.

3:34:31 - Brad Taylor 
So that's going to solve their PDF on and also their spreadsheet mapping. And then it goes back into what once again, uh, so I've created these chains. I showed the meeting one, but, uh, so I'm going to create a chain that summarizes every week. Um, all of the events or sorry, all the like meetings, um, all of the, I already have the one for, so basically each client folder is now going to have its own knowledge base folder. So anything you put in there, like a training document, like, Hey, this is what you want to actually be in there.

3:35:19 - Brad Taylor 
Not like all this cluttered mess of like comments and bullshit. No, this is like pristine shit. Right. Put it in this folder. But I am going to go through and anything in their external shared folder, I can get the comments thread and I can summarize the weekly comment thread, be like what conversation was had, what action items were there, what decisions were made in the comments. So I got that stream, I got the Slack summary stream. So just once a week, it's gonna go through and it's gonna be like, I have a search that says, give me the comments from Google Drive, give me the Slack threads from each of our customers.

3:35:56 - Brad Taylor 
The JIRA summaries, so basically what are all the JIRA tickets, what's all the activity that happened in JIRA, and summarize that. And then what are all the GitHub pull requests and everything that I guess we have, we can't do, like IFs and some of those other customers. But basically just have that do it once a week and then put that into the event sheet for every single one. We could tell them like, hey, if you connect with Answer.ai, you can get these summaries too. But yeah, the whole goal is to then, and then I was like, where am I going to put this?

3:36:37 - Brad Taylor 
I was putting it in the spreadsheet. I was putting it in Airtable. I was like, I need something better that's more there. I was like, oh, So now I'm going to go through and I'm actually going to create these as our own documentation content entries in Contentful. So then it shows the creation of content on there. So then we can actually just build an internal status chatbot that is powered with our own.

3:37:11 - Adam Harris 
All sounds great. Love to see, I mean, I know this is like a specific use case, but it's the JIRA one especially. It's like an automation that assuming we had the data in there, like if we had like all the fields filled out that we, that we should, you know, it's like basically when a ticket gets closed, there's an automation that runs that gets, gets the JIRA. If we had access to the GitHub basically builds out like a summary slash retro. Type of thing for it. And it's just like, and just puts it in just like saves it in Jira.

3:38:02 - Adam Harris 
Basically, it's like this, it's a field that's like, here's like the retro, or a document, a link creates a document, here's a link to it or something that for all the tickets, but when it closes, not like as it's going, I don't think that'd be.

3:38:18 - Brad Taylor 
I would yes and that and say that, yeah, we should do an internal retro and an external like summary report so that when it does close that, that then like, Hey, this is the external thing. And then here's the internal thing. Like look for these things. Like I would basically send it off, like create the external summary, create the internal one where I'm looking for, like, how long did it take to close it? How long would it sit in certain statuses? How long were there any gaps in the, in the comments?

3:38:44 - Brad Taylor 
And really start like just analyzing it. And a lot of these sentiment and analysis and those things, like we use GPT 3.5, it's perfect. Like, and then use like GPT-4 to then like, all right, let's make some sense out of this shit.

3:39:00 - Adam Harris 
I mean, I mean, there's like the analysis part, but even like, let's just say like somebody is like, oh, like it, didn't work like oh the text the text size is wrong on safari and then I go and I create a github pull request and I'm like whatever fucking add a new style to it you know this summary would be like say this is the problem this is who submitted it this time this is what the result was oh like styles need to be updated in the block whatever you know like like a retro so like krista could be enough somebody's like so what was the problem she doesn't have to be like again what was the problem or like man this is like oh yeah like one of the styles was off like it doesn't have to be like every fucking little thing but it's gonna be pretty cool like,

3:39:51 - Brad Taylor 
Well, my hope is, is that, and my goal of this is, like I said, I'm like, I, I mean, between Google comments, Slack, JIRA meetings and GitHub, I'm like, ads pretty much everywhere that work happens. I can't like, if something, if you tell someone something, then it must've been in a direct message or it must've been like, in a private, you know, zoom or something like that. So it's like, I think that's the other reason too, is like, so for when we're making these decisions that they're kind of in there now, this is where we're also going to have to be very transparent with our own company.

3:40:34 - Brad Taylor 
Right. Because we're actually dogfooding our own shit. Right. So we're talking about privacy and stuff like that. We're going to figure out these privacy things, right? As we grow, but we need to kind of like, understand that everything we're doing is transparent until we yeah, can assume that it's going to be in some transcript. So I think culturally, when we come back to this, I need to be like, Hey, you know, like this whole like, just assume that anything you do in here is just going to be in any response, right?

3:41:08 - Brad Taylor 
Like we should always be treating our customers like that. We should have that kind of transparency. Obviously there's things that were not going to be, you know, there, but like, you know, we can, the only things that I care about are like talking bad about customers or anything like that. Anything that you'd be like, I want them to see that.

3:41:34 - Adam Harris 
Well, I mean, I think we have this separation between the internal and external comments channel or whatever. Yeah. Obviously like we just have to make sure we're lagging that appropriately.

3:41:45 - Brad Taylor 
Yeah I'm more concerned and that's where I think like if we do want to have that like just saying like hey there's that like I want to kind of get rid of the internal external comment to be completely honest dude I'm also really thinking about the fact that I think we should just switch to Trello. I really think there's so many reasons to use that. It's so more user friendly, it's there. I think we're using, Jira's become so bloated that it's just, and it's so expensive. It's one of our, most expensive technology.

3:42:29 - Adam Harris 
I think we just have to put together like, A sample, like a small Like a sample like integration, what does it look like, Not a support ticket shed or whatever. Like it's more of like,

3:42:47 - Brad Taylor 
I'm. Not saying I'm gonna do it on this one,

3:42:48 - Adam Harris 
Ok.

3:42:49 - Brad Taylor 
But I think in Q one we needed to, we need to really evaluate it cause it's our most expensive technology. And if we could really lower that budget, that would be great. So That's it.

3:43:02 - Brad Taylor 
And I want Cameron to be open to it. And I'd like your support on that.

3:43:08 - Adam Harris 
Being open to it. Yeah.

3:43:11 - Brad Taylor 
To research to research the, the possible. Ability of going into Trello. I can develop a POC of like, hey, this is how we could, my whole goal is automate when we do in HubSpot, that then when we close the deal, a new one, it creates the Trello board, it creates the Google Drive in that thing, it has all the things that you need, it creates the chat bot, It spins up the freaking thing and then seeds it with the chatbot that then has all of the stuff that we just talked about. Like, that's my dream, right?

3:43:51 - Brad Taylor 
Because then that automation can be able to create a new site, create a new site. But also, too, that kind of onboarding experience and also the standardization of it all.

3:44:01 - Adam Harris 
And

3:44:03 - Brad Taylor 
That's kind of the dream there, right? And then each Trello board is attached to an SOW. SOW, first one is migration. Then there's SOW this, SOW that, SOW this. And all of the closing and all the things and all the data is then in each of those either SOWs or in those individual projects or whatever that is so that the communication streams and everything is very easy to. Site.

3:44:27 - Adam Harris 
Reason. No. What were we using for answers. What was it?

3:44:33 - Brad Taylor 
Well, now we're using air table. I, I thought about that at the beginning of the year. That's what I first evaluated. And I said, no, I was like, all right. Now I'm like, okay, new year, let's evaluate Trello this year. I thought air table. And I was like, nah, it's more of an automation tool. So like,

3:44:52 - Adam Harris 
I've only used Trello like in somebody fucking maybe. And it was, So I don't know like what the configuration options are and stuff, but I mean, I'm definitely open to it if. I mean,

3:45:09 - Brad Taylor 
You have. To understand what we actually need now and what our requirements are.

3:45:09 - Adam Harris 
Have.

3:45:13 - Brad Taylor 
And honestly, I think that, you know. We don't need that complex of a system right now. I think we just need the comments, we just need some basic statuses, and we don't need to do what's your time type, all that shit. Guess what? Now we can categorize that based off what they talk about. We can do that stuff. We don't need them to self-select into that shit. The things that we used to have to have them log and track and categorize and do that for our reporting, we don't need that anymore.

3:45:49 - Brad Taylor 
We can analyze the data based off of that, just based off of where they do the work and where they comment.

3:45:55 - Adam Harris 
Yeah, I mean most of the, yeah.

3:46:00 - Brad Taylor 
Like, type of tit, like all that shit. Like, I just need to know three statuses, really. Four, like, right? Is this, like, you know, in pro- is it there? Is it discovery and, like, we're trying to figure out what to do? Is it being developed or worked on? Is it in QA or is it launched? That's it. Five statuses. I understand there's more to it than that, but there's something in that respect, right? So, like I said, I don't, we don't need to figure it out right now.

3:46:34 - Adam Harris 
You messed up. Somebody showed me, was it Cameron? It was Cameron this morning. It was showing me like, so Copilot has like the, like create like the, like your commit message for you. But I'm just wondering if even if we don't have access Yes. We don't, even if we don't have access to like IFs, GitHub through the API, you do have access through the actions, like a pre, a pre commit action that could happen. So like we could keep track of that somewhere like that. I don't know if that's ideal.

3:47:22 - Brad Taylor 
No, I want I want something like that, because honestly, I want not even a pre commit action or something like that. But if we if we want to put like some husky or something like that to basically like do a code review, right, or something like that, I want to figure out how we can do that. And I want to talk to you and Max about that. Like right now, I'm just trying to get like the knowledge for this, like, demo, but then I want to talk about how we can get some automations into our QA process that like do these, because at the end of the day, like, like I said, like it shouldn't have taken like all that turnaround, like all the feedback that you gave that those contractors could have easily been handled by a fucking chat bot powered by Daisy.

3:48:08 - Brad Taylor 
I mean, let's face it.

3:48:13 - Adam Harris 
The big takeaway from all that stuff was like, I mean, also garbage in garbage out, I mean, garbage is too. Too rough on them and me, but, you know, it's like it's like it has to be fucking specific.

3:48:30 - Brad Taylor 
Oh yeah, but that's the best part about AI is that now we learn, now we refine it, and that's what you do with everything. Like, what do you now put into your response so you get it? Now you fine-tune that. Now we take what we do with those contractors and we say, great, you want to start a new project? Great. Tell us a little bit about it. Then when a customer puts it in, it outputs the exact same fucking thing. So when a customer puts that in, I'm my goal is automate that whole damn process from customer putting it in to closing the deal with the person with the AI bots and getting the best deal to then giving them the instructions to helping them out to then code reviewing their shit.

3:49:11 - Brad Taylor 
And then basically you're like, all right. And then have, you're like, you're overviewing just like when the bots fail and then figuring out why they failed and then fixing that. That's what I want people at Answer.ai doing is like overseeing the bots and then helping us fine tune them to automate that entire process.

3:49:35 - Adam Harris 
I mean, we talked about this a while back, a couple weeks ago. I really want to see the problem, even like what we did today. It's like, what are the patterns here and stuff like that? It needs more context and it needs multiple passes at it. It's not, you can't just look at a single file or folder and know the pattern, you know what I mean? It needs to use the flow stuff and be like, it's gonna take a bit, but if it's like, here's all these different examples, what are the patterns between them?

3:50:14 - Adam Harris 
Take that and use that over here.

3:50:17 - Brad Taylor 
Use the research assistant. So one of the things around is basically it does the questions, but it goes and it asks itself five different questions. It does that different context asking. So the way that it works is it kind of creates its own chat flow, right? So the first thing it does is ask five questions, you can add different ones, and then it'll go through and it can search files, it can search code. When I hook that up to Daisy, you'll have the same kind of like understanding a little bit.

3:50:45 - Brad Taylor 
Cause that's where, where, where like the sidekicks failed because they're one, they're called one shot, right? There's just one style of prompting. But now with these different assistants, what I'm building are like, I'm doing chain of thought things I'm doing, you know, where really the assistants, I'm the way I'm designing them is that basically each assistant has tools, right? And the tool can, can talk to an API, it can maybe search context in in, in, in Pine Cone. It can, I have one tool that just gets the current date so that when I'm like, oh, you want to go back in time, it knows the current date and it'll be like, oh, how about this time to this time and then actually send over date queries.

3:51:29 - Brad Taylor 
So, these tools can also be sidekicks, right? So, like, I have, like, uh, my, my, my, my blog writing assistant has a tool that is the outline sidekick, the copy sidekick, these one-off prompts, right, that then, like, give you the first draft that then the human takes over. So like using individual single prompt sidekicks that assistants then use. Another good example of this is the research assistant. So the research assistant has one that creates five questions in a JSON, then takes those five questions and then goes and researches the web and researches the documents that you uploaded based off those questions.

3:52:14 - Brad Taylor 
So it focuses just that question on those documents then each one.

3:52:18 - Adam Harris 
But I guess the thing is like, I don't know the, like, what I'm talking about is like, I don't know the question.

3:52:29 - Brad Taylor 
Oh, but that's the, that's, that's the, that's the other thing.

3:52:31 - Adam Harris 
To. Be like,

3:52:31 - Brad Taylor 
Too.

3:52:33 - Adam Harris 
Tell me about, like, we have Daisy. It's like, I don't want to like, don't tell me how to create a hero. Cause I don't like, what I'm saying is like, I don't need to create a component. Like kind of what you asked me, like, what are all the steps I need to do? And what is the pattern I need to follow? So like, can you create, ideally, basically be like, hey, create me a boilerplate component based on the patterns that already exist. And it was this go through and like, create one for me based on whatever that is.

3:53:08 - Brad Taylor 
So on here, you can, so one, you can see these, but basically with the different tools in here, right, you define them. But in this, when you, one, you can do starter prompts. So these are basically like, hey, this, like, What are this? And it kind of like starts it on a flow. So like your starter prompts could put it to a tool, right? This is the very first tool that then respects this, that then starts them down as a particular flow. So you can do it with starter prompts or when you embed it or actually use it in...

3:53:44 - Brad Taylor 
Oh, do they not have the... Oh, here. Well, you're allowed to. Passover, it's not in here, it's not in this API doc, but basically you can Passover, like it says, hi, how can I help you, right, by default, but you could say like, this is what it is, these are the questions you could ask, right, like you could give it a lot more of that first prompt and have it do a first thing. There's a lot of different ways you could set it up, basically.

3:54:28 - Adam Harris 
Thank you. Know that because like, I wanna that 1st I want to like truly create the developer documentation. Like I wanted to create it as if we're giving it to a person, not itself. And I think we just have to take some more baby steps. I feel like to get, get there. Cause I don't really, I'm like, I don't want you to tell me what this is doing. I want to tell, I want you a higher level, like, how it's all connected, you know, because I just don't know how to describe it to somebody at the time, you know what I mean?

3:55:03 - Adam Harris 
I don't know. Like these Fibber people, I'm like,

3:55:04 - Brad Taylor 
Describe what?

3:55:08 - Adam Harris 
Oh, you should use style components and MUI. But like so much of what we're doing is like custom, like just our pattern of like our setting up the theme file. It's not like why we're doing. Or whatever.

3:55:22 - Brad Taylor 
It.

3:55:23 - Brad Taylor 
Here's the thing, though, is that in the future, I'm going to say download this once it's done. I'm going to download this starter and put the components in here and deliver us a storybook. I mean, that's the easiest way you get over that to make sure it's in our patterns. For new ones obviously if it's like an older site like coalition impossible those things I think we have to evaluate like what's the cost benefit analysis on that to have someone internally versus that versus starting to migrate them over to this thing.

3:55:50 - Adam Harris 
But I'm saying just in general like I would say let's say I mean coalition like they gave us their old code base and max needed to like go through like fucking update like hundreds of components basically It would have been nice for a talk.

3:56:09 - Brad Taylor 
Max or Camilo, are you talking about the first time they gave us the... The

3:56:13 - Adam Harris 
Library, I'm saying the library, sorry. The library, we had to do it. But it's like if... I'm just saying like it... If I'm giving direction to AI or to a person or whatever, and I say, this is what I need you to do, this is what I need you to follow. Like if we can get it to identify like what have all the different files.

3:56:37 - Adam Harris 
And what their purpose is and what the pattern is within them, and then what it is as a whole. So like, it's not just, oh, here's how you could create an extension, but it's like, also need to make sure you have a fragment. In that fragment, it has to have this. Very high level of it. Not for a component doesn't exist. And you can say, create me a new component. And it's like, it's like, here's your.

3:57:03 - Brad Taylor 
Needs to have context of how it belongs in the rest of the ecosystem, right? It can't. Be. Like,

3:57:07 - Adam Harris 
What. I want. To.

3:57:07 - Brad Taylor 
Hey, I'm an ant. And I'm like, I'm on the earth, like, no, you're on an elephant.

3:57:12 - Adam Harris 
And that's the best part, that's, that's the part I want to see that can do because if we can truly do that, then the documentation is gonna be fucking amazing. And then I'm just feed off of that. For everything else versus like, oh, this is what.

3:57:26 - Brad Taylor 
I think that's where you do is, is, is, is this kind of like, like I said, this I've been really, really working through some of these. But I think too, what I wanted to share with you was a UI for this, which might be something we look at. I don't think we, it's from building stuff at scratch. I don't know how it would do on other ones, but where is it? One of the biggest hurdles to vastly. Shut up. Okay. So wrote a bunch of code. Now it's asking me to install a few things. Go ahead. Okay. And I can tell that it is at that just mean.

3:58:14 - Brad Taylor 
All right. So basically it's called GPT pilot. It looks like it's a VS code plugin, but basically the way that it works and the way that AI is really what distinguishes Gpt. Pilot Okay, so let's take a look at some of the descriptions of what it's going to be building implement user registration back in logic and we have the programmatical to follow these steps. But that just means that it's going to run it for me. And you'll see that in a minute. So here you can see it's man's that it's going to have to write out, Ok.

3:58:49 - Brad Taylor 
So basically he started with this and he started and basically it walks him through the process. So this is where we're talking about like human in the middle. What are the things right? So like hey, I need your input and it just like then props them great. I need oh, do you want this or no and then basically just keeps asking him like, oh, I'm not sure what to do here. What should you do like when the probability goes down? And then just as like, cause like you gave him a basic thing. I want to create a login with a MongoDB database node using these things.

3:59:23 - Brad Taylor 
And it's, and it's going through and it started at the beginning with like, you know, here's the description, here's the architecture, and just asks him questions along the way. And then when he runs into bugs, actually helps him debug it. But I thought this was very, you know, and shows kind of this, this dev UI, but I could see something like this with journeys with like, Keep going till you need the human keep going till the new human right where it's asking you the questions Like I want to start a blog journey great.

4:00:00 - Brad Taylor 
What do you need to do here? Bla bla, blah, blah. Give me some information.