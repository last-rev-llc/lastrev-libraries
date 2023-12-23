1:03:54 - Adam Harris 
So the project is in a monorepo. It's using TurboBuilds. The ESLint config is...

1:04:08 - Brad Taylor 
Hold on. I was just making sure I'm in the right one.

1:04:17 - Adam Harris 
So if you go to the ESLint config custom, really this is just where any custom ESLint things will need to be set up. If you wanted to modify it, you should not need to.

1:04:34 - Brad Taylor 
So this is how you can create your own custom Linting configuration for the code outside of ARPS.

1:04:44 - Adam Harris 
Graphql extensions. Coming into here, like these, you go into the source. So, this is where all the extensions are set up. So, generally for each content type that you're looking to pull, you would create an extension for this where you would set up the last row of libraries will automatically the content models down from Contentful, create types for them, but there are times when you want to extend them because you want to use a more specific type. When you do that, you use this block example here.

1:05:32 - Adam Harris 
You want to export the type defs and use the GQL tag to extend the block content type. So for each field that's in here or if you had a new field that wasn't part of the content model that you wanted to create, you can come in here and you can give it the field key and how you want it to be. What the type of that field is, like how it will be rendered basically, how it will be returned. So intro text is going to be a text content type. Media items is an array of media. Supplemental content is a general content because we use content type, the content pair for reference fields when it can be multiple types of content.

1:06:22 - Adam Harris 
And this is much more kind of like general catch all so people can switch them out in Contempo easily. Down below in the extensions, if there's any mappers that are needed, so this can be any modifications to the value that gets returned. So in this case, Variant, while that is a string in Contentful, we have default resolver that will camelcase the values. So this allows us to have more user-friendly values in Contentful. So Variant might be like content on the right, content on the left.

1:07:06 - Adam Harris 
So this way we can actually have that as more user-friendly content space on space left or whatever you wanted. So this just kind of standardizes it on our side and cleans the code up. And then if you go to car, let's go to like a page or something. So scroll down a bit. So in the mappers here as an example. The first level under the mapper and the object that key is going to be the content type. So when this has page and then little child key of page, it's saying, hey, when a page is meant to show up as a page, I want it to.

1:07:57 - Adam Harris 
Use these mappers. If a page is going to have a child of a link, so it's going to, you're going to show somebody puts like a link CTA and they have a reference, they want it to display as a link. We don't want to pull back the header and the footer for the page. We just want certain fields. So this is, this mapper allows us to map the fields from page to link or whatever the other type is.

1:08:23 - Brad Taylor 
So let me repeat this back to you so I understand clearly what is going on here. So one, do you have to create an extension for every content model?

1:08:39 - Adam Harris 
You need to at least create like a blank mapper, basically. You would say like, actually I'm not 100% sure of that, but it doesn't not, you don't have to like, it can be almost totally bare bones. Like you don't have to have mappers, you can see here. You might not need to even extend the type, but recommend doing so because unless it's a super basic content model of just strings, to come in and just create a file for it.

1:09:15 - Brad Taylor 
So then the typedefs here, so this is basically you're defining in GraphQL what is coming back. So for instance, here, you're saying header is going to be of a header type. Where are these types actually? How does it know?

1:09:33 - Adam Harris 
That header's coming from like the header extension. So if you go, so go to header extension, you'll see where that type is being.

1:09:42 - Brad Taylor 
And because it's being pulled in here as the page header resolver.

1:09:50 - Adam Harris 
It's a little different. If you go to header extension, You'll see we have like, there's gonna be a type created for every content model or content type that's there, and we're extending this. So this is what it's referencing when it says header. So navigation item, link, media, we're creating all these types automatically based on the content model, but then you can also extend it. So by saying header, on the page, like the page type field that are like, you're getting this, this is really the type that you're getting plus whatever's in Contentful.

1:10:35 - Brad Taylor 
I'm going to walk through two use cases and you tell me exactly what I would do to enable this on the data layer. I want to add a brand new field to a content model, how do I then get that to show up and use that in my fragments and in the data layer?

1:11:01 - Adam Harris 
So the first thing depends on the field type that you have. If it's a text field, a number field, like a string basically, all you have to do is add it to your fragment. You don't need to add it to the extensions unless you plan on modifying it before it gets to the components. If it is a, media field or reference field or something along those lines, you would add it to your fragments and add whatever like children fragments are needed, we can go into, and then you would wanna add it into this extend type.

1:11:44 - Adam Harris 
So if you modified header and you added like some new field, like another Boolean field in here or something like that, you could come in and modify it. If this is actually a good example here, this has CTA items, does not exist in Contentful. This is a custom field. The header extension.

1:12:07 - Brad Taylor 
In the header extension.

1:12:11 - Adam Harris 
So this is something that we're calculating based on other values coming from Contentful. So we're getting the CTA items field using the get localized field, which will automatically pull it based on the current locale. And this is just returning whether or not it exists or not. This is a very basic example, but what this does is takes the logic out of the component, in our case, and we get this tab, we'll just have a Boolean value that we can use.

1:12:47 - Brad Taylor 
So let me repeat that back to you. So when you're adding a new field to Contentful, if it's just a regular old text field, symbol field, it will, you don't have to add it to this defs and the extensions. You have to add it to the fragment, but not the extensions. And the fragment is located in the components, which we'll get to here in a minute, but that's the, if it's a basic field, and is it just symbols and text, does rich text also include that?

1:13:24 - Adam Harris 
Booleans, rich texts, I think reference media and link fields are the three that you generally want to.

1:13:37 - Brad Taylor 
Right, so basically any reference, because you're basically using the type of reference it is, like it's a reference to a hero, so you're adding those types in there. If you're doing a media, we have a particular structure for media. So anything that we kind of have defined the structure of

1:13:57 - Adam Harris 
Yeah, media link and rich text and content. We're enriching them in our data layer which is why those need to be added.

1:14:08 - Brad Taylor 
And then you can also have an add in the extensions. If I wanted to add a value that is a calculation, a concatenation, some sort of parsing or transformation of other data with inside of this content item, you can use the mappers and then add that into the type depth as well. The function to do the transformation is in the mapper. And then you just set it to the value. Okay.

1:14:51 - Adam Harris 
Okay, so what? Oh, yeah. Do you have another use case?

1:14:56 - Brad Taylor 
This actually so the other you will the other use case was how do you actually use it to combine two things and that kind of did was answered my question.

1:15:05 - Adam Harris 
Appreciate a good one. Go to. Put a block extension again.

1:15:11 - Adam Harris 
It's not it's not in this one. I don't think it's in here. Well, like there's something. I can show you. So if you go up to the a little. Bit. I don't know if it's in the starter. Go.

1:15:26 - Brad Taylor 
This. Is B blog, blog or block.

1:15:31 - Adam Harris 
Go to block. Let's see if it's in block. No, it's not. Go back to blog and there's a good example in there or something else. Okay, so if you scroll up a bit. So this is a really good example. So our blogs content model does not have a hero field. Instead we're, but you can still return a hero content type that has been actively like generated based on other fields that are on that blog. So this way, like somebody doesn't, when they create a new blog, they don't always have to go to create a new hero and then all those steps.

1:16:12 - Adam Harris 
This is a good example of being able to create a type on the fly and we're extending blogs. So it's still returning it as a hero.

1:16:22 - Brad Taylor 
So just to repeat this back to you, so when you have the use case where you have a flat fields, for instance, you maybe have the title summary and two CTA fields, but yet you wanted to use the hero component as a variant, you can now transform the data so that hero comes back in this particular area so that then you can then pass it into the hero component or the sub component. Just as if it was coming from the content model itself. So how to use data inside of this entity to create the sub components on the fly.

1:17:05 - Brad Taylor 
Okay. Good, good example. Any other examples? We'll get into what these different, I'm assuming these are all part of the SDK core. These functions create rich text and all this, okay. Well, let's talk about that next. So the-.

1:17:25 - Adam Harris 
One more step actually to show you. So go back to the GraphQL extensions. Once you've created, let's say you're creating a new content type. If you go to the index.ts, You do need to add it to here, so you want to add it to this modules array with the name, and then you just require that.

1:17:51 - Brad Taylor 
Excellent. So if you need to add a new content model, content entry or not content, content, content model, or content type, you go into the index of the GraphQL extensions and add that mapper to the extension there following the same pattern that's in the file.

1:18:16 - Adam Harris 
That's what I have to do.

1:18:17 - Brad Taylor 
All right. So next we're going to go over the GraphQL-SDK.

1:18:29 - Adam Harris 
I'm in here. Max be better for this one, but click on going to queries. So to start in the starter, we have a page query. This is going to be like your core query for returning any full page from Contentful. If you have a new page that you want to or something, a content model that you want to act like a page, so you can see here we have Normal page, we have a person, a blog, a form. You want to make sure that you add the fragment in here or that resource fragment or case study or whatever actual page that will have a URL on it.

1:19:26 - Adam Harris 
I want to make sure. You add. That.

1:19:27 - Brad Taylor 
So. This is. How you can pass in a page query. And you can pass in a path as a string, it looks like it's not required, or it is required with the exclamation point.

1:19:39 - Adam Harris 
This is all required, but this will all be handled. And I'll show you show that part in a second. But really, the only thing people will be modifying in here and making sure you're adding the fragment for that full page. And you're otherwise, it would not be able to, you'll probably be missing some fields. You'd only get overlaps.

1:20:06 - Brad Taylor 
Do you have an example of a query that we can use in Apollo to test this, like this query?

1:20:21 - Adam Harris 
Can you hover over the versus site string over the query. Imp stalled.

1:20:35 - Brad Taylor 
Sharon. So Paul.

1:20:38 - Adam Harris 
Let me see what other ones.

1:20:39 - Brad Taylor 
I have Apollo GraphQL installed, yeah.

1:20:42 - Adam Harris 
You don't see a query in there. Yeah, Apollo.

1:20:51 - Brad Taylor 
That should be something else we had in here is recommended extensions for this project.

1:21:13 - Adam Harris 
Setting. You should see a little play button next to the string. It might be a setting in Apollo. Click on the settings in there. Stitch in settings, maybe. Aspects. I'm not sure what makes it show up there or not. But you'll.

1:21:54 - Brad Taylor 
Get examples of all these queries and detailed instructions on how we do this and Apollo Studio.

1:22:03 - Adam Harris 
Well, when you click this, it'll when that button does show up, it will load all your fragments, it will load the query for you. You do need to pass, have an example of the data, the objects that you have to pass in that object.

1:22:21 - Brad Taylor 
That's what I'm asking for is an example of each of these objects to be able to pass in. Like I understand that. And that's what I'm like looking at Apollo studio. Now it needs that like example object. So, um, I mean,

1:22:33 - Adam Harris 
It's, it's parameters. So it would be like half would be the, you're like slash, blogs locale would be the locale string. Would. Be a Site would be your that site name.

1:22:42 - Brad Taylor 
Oh, this is. A graph. Of

1:22:50 - Adam Harris 
That starter underscore anything or whatever you changed it to.

1:22:54 - Brad Taylor 
So path is the path of the URL, locale is the locale, exactly how it is in Contentful. Preview, this is true or false, if it's a preview URL, so content that hasn't been published. And then the site is the string, this is the site ID, or is it the site.

1:23:18 - Adam Harris 
It's like the starter underscore anything. It's that, uh, default site, whatever it was in your,

1:23:25 - Brad Taylor 
Oh, the site ID. That's the environment variable.

1:23:28 - Adam Harris 
Yeah.

1:23:28 - Brad Taylor 
Okay. So when you're passing that in, use that we'll use chat GPT to figure out what the format should be. Um, all right. Are there any other useful queries here? Paths query.

1:23:51 - Adam Harris 
Yeah, I mean, you can use this mostly for debugging. I mean, you don't want to change this. But this is the default path query. So like if once.

1:24:09 - Brad Taylor 
What is it output? So you give it locales, you give it whether it's preview and then the site, does it basically give you the entire, like all the paths in that site? Excellent. This can definitely be used for UI extensions and understanding directory trees and stuff and for understanding your site map. And yeah.

1:24:34 - Brad Taylor 
Okay. So paths, this is the GraphQL endpoint to get all of the URLs that your site generates. And does this include API endpoints? Does this include just the static build? What does this include?

1:24:52 - Adam Harris 
There is your helper functions that you can use like in your extensions to get paths for specific content items. So I believe this is, if we needed to modify, this is a query that is getting run by our libraries. So we're effectively using these to extend our libraries, which will be running this path,

1:25:18 - Brad Taylor 
This.

1:25:18 - Adam Harris 
Query to get those.

1:25:23 - Brad Taylor 
Um, then preview, this gets the preview when you're passing in. So the ID of the content model or content in tree entity content entry that you're trying to preview, and then the locale of it, and then it essentially passes it in and then uses the content module base fragment so that you can preview any content. Redirects, this looks to be a, that will just give you all of the redirects, source, destination, and permanent. Same thing for rewrites. The sitemap index, so this is a GraphQL to get the full sitemap.

1:26:10 - Brad Taylor 
And then the sitemap page, so the one specifically for the sitemap page. I'm curious what the difference between these two are and why.

1:26:20 - Adam Harris 
So the sitemap index will return an XML document of the individual content type pages. So for anything that's a page in the index will be listed as like whatever your URL is, it's like slash sitemap slash page resources..xml or something like that. And then if you went to that URL, it would have all of the actual page resources in there.

1:26:56 - Brad Taylor 
Got it. So it's sectioning the sitemap by sections of the site. So everything that's a sub path then has its own sitemap, which then has its own XML file with all the paths.

1:27:07 - Adam Harris 
Based on content type. Yeah.

1:27:10 - Brad Taylor 
Based on content type? Only page content types though?

1:27:15 - Adam Harris 
Correct. Yeah. Or anything that has a path generated. So this basically uses the path generation tool or query to get all the content types. And then this is just splitting it up. You don't have, you could just do it as like one whole page, single page and not use the index. But given how large some sites can get, this makes it load much quicker.

1:27:41 - Brad Taylor 
Yep. That makes sense. Okay. So those are the main queries. So those were all the queries in the GraphQL SDK. You. Anything else in here?

1:28:04 - Adam Harris 
If you're debugging wise, the s, the schema graph and most everything in here is auto generated other than what we went over. The schema GraphQL, this is what is being generated When you're running this locally or on the server, these are the full types that GraphQL is expecting. So you can come in here and you can see if there's any issues or anything that's funky. So you would see everything that's coming back both from Contentful, so you can see like internal title in here, as well as any of your custom types that you extended.

1:28:53 - Adam Harris 
This is auto-generated, you should not modify this.

1:28:57 - Brad Taylor 
But it's good for debugging to understand what's actually being generated and make sure that your types are correct. So if you're having type issues, maybe fragment errors, maybe GraphQL issues, you would come in here to make sure that the type in Contentful is matching what the types are here and what you've set it up.

1:29:17 - Adam Harris 
Yeah. One last thing, if you go back to the extensions in the page, let's see. Scroll down a bit. Go to the bottom of the page. Sorry, page extension.

1:29:41 - Brad Taylor 
Oh.

1:29:51 - Adam Harris 
Paths can go into paths config.

1:29:59 - Adam Harris 
In order to generate the paths, because we're The way this is set up, if pages have the concept of a parent page. So this, this would allow somebody creating like a let's say they had an About Us section, and then underneath that, they wanted to have a Contact Us page. This is currently set up so when you create a new page in Contentful, you can just choose the parent page of About Us in this case. And then Slug just becomes Contact Us for that particular page. So in order to generate the full path of everything, as well as it also becomes helpful when you're doing breadcrumbs, We have this function that's in here to generate all the parent paths and the path for each page.

1:30:54 - Adam Harris 
So you just go to the bottom. And right now they're all calling the same function, but this should map to all of the pages that you want paths created for. So if you were to create a new case study content type that had to have its own URL, you would add it to the page query, the preview query, and make sure that you add it into paths config. As long as that that model stays the same with the parent page and slug, you can just call generate paths. Yeah. If.

1:31:33 - Brad Taylor 
Let rep, let, let, let me rep, let me repeat this back to you. So basically, if you have a new content model, And it is just a subcomponent, it's going to be brought in, you don't need to do anything. But if you want that content model, content type to be a destination, something that generates a path, a URL that a user can go to, such as a new blog, a new detail page for an article, a new detail page for a person, a new detail page for a product that it has its own slug, you would go into this path configs extension, add that as a add the the logic to generate those paths.

1:32:27 - Brad Taylor 
So by just adding it into the past config at the bottom, and just generate paths.

1:32:35 - Adam Harris 
You ad the content ID, generate paths. If you wanted to have custom logic, you could call its own function here. The number one thing that needs to get returned, if you look at return full path, this is what is being expected in the path generation, like utilities. So it needs to follow this pattern. What the value of full path is, is up to you.

1:33:10 - Brad Taylor 
So what if I wanted to add a new extension, API endpoint function that literally just takes in an ID and gives me back what is going to be generated from that one path?

1:33:30 - Adam Harris 
There's a helper function in our libraries. We have our path readers. So if we go to a path, see if there's something called, go into the utils. See if I can find you an example, go up. Under utils, oh no, in graphs, sorry, in the extensions, in the utils folder. So I got path reader, path resolver, maybe. Yeah, there's a good example. We can either use this function, but you can see here that we have in the context that gets returned from GraphQL, we have the path readers and we can use this get paths by the content ID.

1:34:26 - Adam Harris 
This will return an array of whatever the paths are for that item. You can use this. There's also, there's.

1:34:38 - Brad Taylor 
Excellent. So if I wanted to create a service that allowed me, I'm getting a little ahead of myself. We'll bring it all together here in a minute. But

1:34:48 - Adam Harris 
Ceral Creat, a Cerb function that Instantiate the Graphql, pull this and return the Id or whatever, or. You can create a serverless function.

1:34:58 - Brad Taylor 
Say that again clear. I didn't understand that.

1:35:05 - Adam Harris 
Could pull, use this path reader to return information about a content item including the path or But like,

1:35:17 - Brad Taylor 
Got it on. Okay.

1:35:18 - Adam Harris 
Whatever you need.

1:35:21 - Brad Taylor 
Sounds great. All right. Anything else in GraphQL extensions or the SDK?

1:35:31 - Adam Harris 
Yeah, so if you go into, so if you want to troubleshoot for whatever reason, the CMS sync, so when you run Yarn dev, or you can run, or sorry, PMPM dev, or you can also run PMPM space sync colon CMS, and that'll like re-pull it down from Contentful, but we are storing it locally as well. So if you go into, in here you would see the different space IDs, and then you can go into entries and you'll see it all sorted by ID. So if you had the content ID of something, you can come in and actually see the dot return from Contentful.

1:36:16 - Adam Harris 
For troubleshooting purposes. That's it.

1:36:26 - Brad Taylor 
Okay, so to repeat that, so you can go into the Dot Cms Dash Sync folder inside of graphql-sdk to see what is downloaded from Contentful and that is used in build to ensure that you have latest content and every item is saved as its own. JSON file from all of the assets, all of the content types, all of the entries, all of the entry IDs by content type, and then the path data as well for every single build. Does this get cleaned up?

1:37:12 - Adam Harris 
Anytime you run it, it'll read. Re-pull it all.

1:37:18 - Brad Taylor 
Got it. Every time you re-run it, it'll re-pull the information from Contentful so it has, so it can build it locally. Got it. All right. Um, and is also a great wealth of information for how the content modeling works for Daisy. Um, and or, uh, their content actually. Um, so for indexing, um, all right. So the next piece is this just preset so that you can configure the, uh, automated testing configurations.