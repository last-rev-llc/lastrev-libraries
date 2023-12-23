1:38:07 - Brad Taylor 
All right, now the UI. So should we, let's first give an overview of what's in each one of these files, like the structure. So now we're in the UI package of the starter.

1:38:25 - Brad Taylor 
We're going to go into the block and every single component has a similar structure.

1:38:35 - Adam Harris 
Similar structure, yes. And I'll show when it doesn't. So, let's just start on the index file. So, the index file is effectively just pulling in the block, in this case, the block props from the block types, as well as the class keys. Class keys are going to be used in order to do like lookups on if you wanna have like custom classes basically or add a class to your style components. Mostly the index file is used just so it's easy to import from other files. So you don't always have to say import block props from slash block slash block types.

1:39:29 - Brad Taylor 
Got it. So this is pulling in all of your block properties, um, which includes, you know, all of the fields in the model. Uh, it includes, um, the system information. Does it, what information does the properties include and what, and then you said that the block class key, um, or custom CSS classes. Ok,

1:39:53 - Adam Harris 
Yeah, we'll get into that when we get to the theme file.

1:39:56 - Brad Taylor 
So but these are just importing these from the types file, which is the next file.

1:40:03 - Adam Harris 
Ok, so we're importing some types from MUI material in this case, just for TypeScript purposes. I'm also importing the rendered fragment, the generated fragment from the GraphQL SDK slash types. So the schema file that we saw, the GraphQL SDK types will have that value and it does look a little funny, so you need to double-check. If you're in any confusion, double-check what the name of that is, but it effectively adds Fragment to the end of whatever you called your Fragment. But by importing that, it keeps them in sync more, so you don't have to re...

1:40:55 - Adam Harris 
You don't have to... Sort. You don't have to redeclare your types every single field again. It's gonna be whatever's coming out of GraphQL. If you want to change that, you can. So for example, here, we're using enums for variants. This allows for a little bit better type checking, we found, as well as the ability to loop through these in Storybook if needed. So you can see when we're exporting the block props themselves. In this case, we're extending the block base fragment, but we're omitting the variant because we want to use the enum there.

1:41:38 - Adam Harris 
So if you want to override, for whatever reason, the types that are coming out of GraphQL, you can do so here. If there's any additional fields that you want to add that are not part of the GraphQL types that you might be passing in like hard coding into your component for some reason, you can also put that here. So in the end, you'll be using the block props as your Source of truth for the types. Most of the time you would not even need to add anything here. You would just do the export, interface, block props, extends, whatever the fragment is.

1:42:21 - Brad Taylor 
Say that last part again, clear.

1:42:25 - Adam Harris 
If you want to add the export interface, whatever your, your component is, even if you're not extending it with any like new fields, just for stronger pattern purposes. So.

1:42:43 - Brad Taylor 
If you want to add a new variant, you need to come in here and you need to add to the block variants, if it's a variant type of

1:42:50 - Adam Harris 
If you wanted to be, if you added a new variant in Contentful and did not add it here, you would get a TypeScript issue saying that if you tried to reference that field, basically. So this allows us to just have a stronger type checking.

1:43:12 - Brad Taylor 
To prevent broken builds and things like that. Okay. So then we have the types file. So then there's the we'll save the actual component for last. The fragment?

1:43:30 - Adam Harris 
Yep. So the fragment is going to be this one just has one base fragment. This will be any of the fields that you want to pull from Contentful. So standard GraphQL fragment, so whatever the name of that field is, and then referencing any sub-fragments, if it's an array or its own object.

1:44:00 - Brad Taylor 
So if you're not seeing the data come back in your responses when you're building it, if you've added a new field to Contentful, check to make sure that you added that field to the fragment here. What is in the content-based fragment and where can you see that?

1:44:25 - Adam Harris 
You click on the content-based fragment. It's in the content module. This will actually be... Might be in content fragment, actually. So this will likely be going away. But for now, it's really just like standard, standard fields that are coming back.

1:44:56 - Brad Taylor 
Let's not go over it then. Because basically, if it's going to go away, and there's not that much in here,

1:45:00 - Brad Taylor 
But this is it looks like where the sidekick is actually done. So how's that going to be done?

1:45:05 - Adam Harris 
Basically, our data, the last web data layer is... Making sure it's flattening out what is coming back from Contentful. So you don't always have to reference like the sys objects. So that includes the ID and the content type. And we're also adding sidekick lookup values to it.

1:45:27 - Adam Harris 
So it's easy. This is for our sidekick extension. So when we wanna do the lookup of what the field is, the sidekick lookup is already added to anything that is a content item.

1:45:41 - Brad Taylor 
And if I wanted to basically add anything, like for instance, the system ID, the or the more I guess the system IDs already in here, but maybe anything that's under the sys or anything that's not included there, I could add this base fragment here. Well, it's going away.

1:46:00 - Adam Harris 
It's going it. Yeah, this was these items ID type name psychic lookup will be added to each item individually. What we found was that when the schema gets generated, it generates a lot of unique fragments based on whether this was nested under block, under header or whatever. So it comes out as header-based fragment. Underscore content-based fragment, fragment underscore block. So it created a whole bunch of extra fragments that we weren't needed. It's not as big of an issue with this current version of the framework because of some de-duplication we're doing, but it is something to keep in mind, so.

1:46:54 - Brad Taylor 
So then we have the mock. So this is the file that is used to create mock data for testing. Is there anything else that this is used for? Storybook.

1:47:10 - Adam Harris 
Here, look.

1:47:16 - Brad Taylor 
So that Power Storybook, which is in the Block Dot story, is in the Dot Stories dot Tsx file.

1:47:29 - Adam Harris 
Everything is pretty standard. We haven't gone through to turn on and off every field at this point. There's also auto dock setup, which will Create sort of book will have a tab that has like the documentation. Based on the types and everything.

1:47:51 - Brad Taylor 
So then we have the theme. So is this the main file you go to for any styling?

1:47:57 - Adam Harris 
And this is the, there's a lot of different ways to do the styling. We're trying to keep it pretty standardized. So the style overrides when you create a difference slots in your component. This is where you would style those at here. Slots.

1:48:18 - Brad Taylor 
What did you say different what?

1:48:23 - Adam Harris 
So like a slot would be like, so when you create a style component, you call it root or you want to call it like whatever, intro text wrapper, whatever that might be. You can give it a class name. Go to block TSX and I'll show you. If we came down here, you can see we have subtitle, for example, right. So subtitle is not an MUI component. This is using a styled component. So if you go to the bottom of the file, you'll see subtitle here. So You can see here that this is our styled component that we're called subtitle.

1:49:17 - Adam Harris 
It is styling a MUI typography component. That's what it's going to be rendered as. The name, this is generally like whatever this content type is or component is. The slot, which is going to be what will be shown like a part of the class name when it's rendered. And then the overrides resolver, we're mostly using it just to like give it like this custom styles, that subtitle. So.

1:49:52 - Brad Taylor 
Is this object, is this styled, is this our own? No, this is, okay, so this is using material UI styles package. And this is a set, so for more information on this, go to the MUI styles documentation. Okay, that's all, okay, that's what I needed to know.

1:50:17 - Adam Harris 
So when you come in to the theme again, So just following patterns. So if something is commented out, it just means like they weren't doing anything crazy with it. But at the root level here, we are using containers and container queries quite a bit. So It's not needed, but necessarily if you don't want to use it, but all the grid system that is there is set up like that. So each of these here, you can see these are the different styles that we have in our overrides resolvers. Using those styles, especially if it's a simple component, really cleans it up so you don't have to try to target the class names individually and whatnot.

1:51:09 - Adam Harris 
So for each of those different slots, the objects, it's going to be whatever is passed in as props. By default, theme is going to get passed through. We're also been using owner state. Owner state, we set that at the top of each of our components, and that allows us to pass either the props through to the styles or you could pass in like custom value for whatever reason, a calculated value. So you can do actually perform logic on that. So if you wanted to say like owner state dot variant equals this, you could have a function that returns different styles based on that.

1:51:55 - Adam Harris 
So every component should have that example. And then for different, so below that we have a function to create different variants. This is standard to MUI, but this is just like how we've been structuring it. So if you wanted to Anything that's in props, so variant matches this value of the content on right enum here, then these styles will be returned. You can add multiple props in there. This is all documented in MUI. UGH!

1:52:48 - Brad Taylor 
So basically, if you add a new variant, you want to go into here to create variants, then these override the root variables or classes on there, correct?

1:52:58 - Adam Harris 
They get merged together.

1:53:02 - Brad Taylor 
How do you override a root class or root style?

1:53:07 - Adam Harris 
You have to have more specificity than the root style, or equal specificity that this is run second. So you can see in this example, we're using the grid. So when the content is on the right, and we're targeting those different classes and then changing where the content starts and ends.

1:53:38 - Brad Taylor 
And then we have the React component. So what are the main pieces of the React component that come in? So the props, do those come directly from the fragment?

1:53:51 - Adam Harris 
The props are coming, getting passed in through whatever's calling this. So the props types are coming from your block props in this case, which came from the fragment and whatever you extended it with. You can also see how we're setting owner state to just be whatever the props are that are passed in.

1:54:17 - Brad Taylor 
What is the owner, so owner state?

1:54:20 - Adam Harris 
Owner state, it's a, It's core to MUI. We're using it because it simplifies the type checking, because it's an allowed prop to be passed through. So it can be whatever values that we want it to be. It doesn't have to be all the props. It could just be one of them or none of them, but you'll see that it gets passed in. We try to add it to all the different components or slots below that allows you to then access that in the theme or the styles and have logic on that if you wanted.

1:55:05 - Brad Taylor 
So we have everything wrapped in an error boundary.

1:55:13 - Adam Harris 
Everything's wrapped in an error boundary. We typically then have a root.

1:55:20 - Brad Taylor 
What does the error boundary do?

1:55:23 - Adam Harris 
It's going to catch errors for you, make it more specific.

1:55:29 - Brad Taylor 
Like if you were, if this failed, do you ever edit the error boundary? Like how is that? What's the purpose of it?

1:55:40 - Adam Harris 
Well, let's go look at it. I've never had it's basically gonna give you more, better stack trace information.

1:55:56 - Brad Taylor 
Okay, so we wrap all of our components in the air boundary for better stack and to consolidate all of our air handling in one place for logging and it looks like everything else. Okay. Next one. So then you have your root, which includes the sidekick lookup and the sidekick helper. You have your data dash test ID. So this is for testing with Cypress, I'm assuming?

1:56:32 - Adam Harris 
Yes.

1:56:33 - Brad Taylor 
Yes. And then the owner state which you just explained, and then you just have basic React component logic.

1:56:46 - Adam Harris 
No.

1:56:48 - Brad Taylor 
So then down here we have the styled, uh, so this is where we talked. So with the themes, so what, so for every component that's styled component that's in there, it has its own component here. And then you're basically passing in the, um, the OverridesResolver, which could be in the theme, or it's using the global styles.

1:57:18 - Adam Harris 
Overridesresolver is core to style components. It allows you to basically identify the class name that you want to use, like this slot that you want to use. I have the slot,

1:57:38 - Brad Taylor 
All right.

1:57:38 - Adam Harris 
But I'm saying the wrong thing, but it's it's a class, it's a class name. So anything you add here needs to be added to the types. You'll see a list of all these in there. It will still work without it, but it would throw a TypeScript issue warning.

1:57:55 - Brad Taylor 
All right, so we have, just to recap, we have the index, which is the index of the components so that it's just easier to import them. You have the dot types, Dot Ts file, which includes all of the TypeScript types for the data. You have the dot fragment. Dot graph Ql. This is the graph Ql fragment. This is also where you go to add those fields so that they come back in the data layer and have, if you add a new field in Contentful. There's also, or in the extension, The.moc.ts, that is the data that is used both for testing and also to render the storybook,.stories.tsx.

1:58:44 - Brad Taylor 
This is the file that will render the storybook for that component. Pretty standard out of the box. The dot theme dot Ts this is the theme file for Material UI. This is where you go to add new variants and root styles. And then you have the main component, the.tsx file of the main component, which includes the main, we wrap those in the air boundary, we have a main route, and then you add your standard React logic in there.

1:59:29 - Brad Taylor 
Anything else on the basic structure before we go through the individual ones.

1:59:36 - Adam Harris 
We'll get to like content mapping and stuff. Maybe we start with content module. Well, we can come back to it.