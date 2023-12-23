1:59:49 - Brad Taylor 
So now we're going to the next section. We're going to go through what I'm, what I was thinking is starting at page. Cause that's really where you start in training. Like everything starts with a page and then you have to add components to a page.

2:00:16 - Adam Harris 
I mean, I'm wondering if it makes sense to go into Contentful.

2:00:23 - Brad Taylor 
That's what I'm thinking is not going to these because these are all I'm not going to document how each one of these works right now. I just want to go in and create the like, how do I create a new page and do those use cases? And then what each of the fields in each of those models that they see do. So. You stop sharing this screen. Can we take a two minute potty break?

2:02:39 - Adam Harris 
The framework started.

2:02:50 - Brad Taylor 
Me too. All right, so let's just start with the content models and let's start with the general settings. So we're going to start with the settings, then the header, the footer, and then we'll go into creating pages and then what each of the components are down to the Yeah, let's start with the settings.

2:03:36 - Adam Harris 
Site settings is going to be anything that is considered global for the entire site. You can create multiple site settings. That that would. Need. Yes.

2:03:53 - Brad Taylor 
This. Is the site ID that you use. This will be the entry of the site ID you use in your environment variable.

2:03:59 - Adam Harris 
Correct. So we need a place to start, basically know what those globals are, which is why I need to define it, hard code it into the environment variable, because there could be multiple. So we have the site key, and then we have a header. Which allows for a site header content type footer. Global SEO, which we used as kind of like the top level, like fallback if needed. And then we have a rewrites and redirects. Team will be removed. So anything global that needs to be, changes that need to be made or pointed towards, this is where you would update those or just modify the item directly, whatever the header itself is.

2:05:04 - Brad Taylor 
You said rewrites and redirects are gonna be removed.

2:05:08 - Adam Harris 
Am is going to be removed?

2:05:10 - Brad Taylor 
Be removed. Internal. Internal title, you have the site key. This is what the environment variable is in there. You have your header, which is a reference to the header item, the footer, reference to a footer item. SEO, this is a JSON object, which then uses our LastRev SEO extension, but is also the global default for that site. When no SEO is specified. So which takes precedent? Is it either the global or is it the top-level page? Because if there's a top-level page, shouldn't that be the default?

2:05:57 - Adam Harris 
It's all the logic is going to be written per site. But

2:06:02 - Brad Taylor 
The current logic though is is that it's whatever the pages, and then if not, then it does it for the site. Okay. And then rewrites, this is where you do your URL rewrites for rewriting different paths and then redirects for three o one three oh two redirects. So once you have your site ID, you have a site redirect. So you have your source, which is the original URL, the destination where you want it to redirect to, and then Boolean to say whether or not it is permanent. Permanent true equals a 301 redirect.

2:06:54 - Brad Taylor 
Temporary is a 302 redirect. I think this should just turn into last rev app settings. Um, for this, for live editor settings, I actually put the internal title settings in there, um, for lively. So I think we can just have one content model for all of our last rev app settings. So currently right now, so for last rev app settings, you have live editor settings, which is just JSON configuration object. See that documentation for more information and the internal, uh, uh, settings, um, which is a JSON object.

2:07:40 - Brad Taylor 
See that UI extension for more information. Let me see here. Is there any? Nope. Okay. So then site template.

2:08:00 - Adam Harris 
You know this better than I do.

2:08:04 - Brad Taylor 
Oh, so is it still working this way?

2:08:07 - Adam Harris 
Yeah, nothing's changed.

2:08:08 - Brad Taylor 
Okay. So site template, this allows you to create templates. These are essentially saved instances of content models. So think of saved configurations. You can add an image, you can add the content that you want to reference. So this is the one that you want to be able to clone. And then a category as well that is used. And then this is what is fed into the Sidekick so that you can choose different template sections when adding a brand new section to your website. All right, so now let's talk about the header.

2:09:01 - Adam Harris 
Yes. So layout style is going to be your basically variant. If you wanted to add different styles, you can in your theme for the header, you can set different variants that you can key off of here. Currently it's using the default one. Logo is going to be what is going to be in the By default, the top left, so whatever the media item is that you want to show there, we recommend using an SVG for this, and then any sizing changes can be made directly in the theme file for the header. The logo URL, so if this should link somewhere, which is highly recommended, you would just choose the page The homepage likely here.

2:10:01 - Adam Harris 
If we'll get into overrides later. But yeah, you would just use the page that you wanted to link back to. Navigation items. So this is going to be a reference. Can you click edit on this? Clear. So this can be either, this will just be a link navigation in here. If this can be modified to just be linking to a page general or a blog, whatever you wanted, the extensions will need to be updated appropriately.

2:10:44 - Adam Harris 
Cta items are usually, we've found that a lot of times people will have like login buttons or kind of like a sub nav type of links maybe on the right that aren't part of the main navigation, need to be handled differently. So in that case, you can add CTA items here, which helps with styling because it will come back as their own object. Not required. Be none. Of this.

2:11:24 - Brad Taylor 
So. If you wanted to add a button to the top or some sort of styled uh le like styled navigation item, like a login button,

2:11:38 - Adam Harris 
Legal link or contact us,

2:11:40 - Adam Harris 
We see a lot. It's separate from the main navigation.

2:11:41 - Brad Taylor 
Contact us.

2:11:45 - Adam Harris 
This is another...

2:11:47 - Brad Taylor 
And you can have multiple CTAs.

2:11:50 - Adam Harris 
Correct.

2:11:52 - Brad Taylor 
Okay, then the super nav icon. And the super nav fields.

2:11:58 - Adam Harris 
And these, these can be used generally for like a site message type of it could be wanted to put something above the header right below it. You can use.

2:12:16 - Brad Taylor 
The site alert.

2:12:19 - Adam Harris 
Yeah,

2:12:21 - Brad Taylor 
And this would go into the header, so it could be like a alert for a sale. It could be a notification of a new product announcement. It could be the notification of your latest blog post. If you wanted to add an alert to your website, you can add that in the header for your website under the SuperNav area. The SuperNav field. SuperNav icon, SuperNav text, which is a rich text editor. And then you can have different text for mobile in the SuperNav mobile text. And if you want the whole SuperNav to link somewhere, then you would then give that as a reference, which then you can choose the page or the CTA that you want to link to.

2:13:13 - Brad Taylor 
If you're going to link to an internal resource, do page. If you're going to link to an external resource, use the CTA and create an external link.

2:13:30 - Adam Harris 
And then background color. This is used to change the background color but effectively changes the theme. So if you change the to something that was a dark part of your themes, it was a dark color, you'd want like the text to change to a light color that should be handled in your styles themselves.

2:13:52 - Brad Taylor 
Is that a background color for the just the header?

2:13:58 - Adam Harris 
Yes.

2:14:02 - Brad Taylor 
All right, so before we continue on to the other pieces, I think we need to talk about the kind of like, well, let's talk about the footer, similar, and then we'll go into So footer.

2:14:22 - Adam Harris 
Has an internal title which is used for making editors lives easier to find items and give them names when it's not generally when it's not a page. Intro contents is a reference field. This is meant for items that globally would want to be shown above the footer. So a lot of times this might be a contact us form or some bit of information. So if you wanted to add something across every where this footer was used in the site, you can do so here without having to add it to each page.

2:15:02 - Brad Taylor 
That's a very important thing. So if you wanted to add a default component to the footer of every page on a particular section, you could create a second footer, add that, contact us, add that to it so that you don't have to add it to every single page you create under that section.

2:15:33 - Adam Harris 
The way it's set up right now is going to be site-wide. If you set it up, you can override it per page. Use the same footer. Create a new footer and use it on every page. Right now it's not based on section because we don't have the concept of the sections.

2:15:56 - Brad Taylor 
Okay, so this is so you can have something. So if you wanted to have a different component outside of just what's in the footer, this is where you'd have a default footer component. And then you could overwrite and have different footers for different pages, but you have to overwrite them individually.

2:16:15 - Adam Harris 
Correct. Or update your logic in the extensions to check the parent pages, go up to the tree and pull that.

2:16:25 - Brad Taylor 
It would require a code change to do that.

2:16:30 - Adam Harris 
Height.

2:16:35 - Brad Taylor 
Very interested to see that, because I'm going to take, I'm going to like separate all of these into the each individual ones. I bet this chatbot is going to know pretty good. All right. Next, logo.

2:16:49 - Adam Harris 
So similar to header, this is if you wanted a logo in the footer, you can add the media reference here, as well as the logo URL for that logo should link to. Navigation items that show up in the footer. This generally, it's currently set up by default to have them in columns, so you can add those link navigation items. In here, which we'll get into, they each have their own children. Social links, typically this is things like Facebook and Twitter and LinkedIn. This is where you would set those, create those CTAs for those external links.

2:17:36 - Adam Harris 
Disclaimer text is a rich text field that can be used to add any site wide disclaimers. Copyrights. Yeah, copyright disclaimer text. This is a rich text field, so this is up to the editors to decide what to put in there, but it is its own field. It's usually styled or placed specifically. Legal links, this is generally things like privacy policy, terms and conditions. These are separated out, but there's no reason they couldn't be added as navigation items if somebody wanted them to be shown in a different way.

2:18:26 - Adam Harris 
And then background color, which is a pun intended, I guess, theme across all of these. So you can see that almost every content model that's kind of standalone.

2:18:38 - Brad Taylor 
So just so I'm clear. You have your navigation items, which is your main navigation. Its default is columns. You have your social links, which is essentially there so you can create CTA items so that you can use the icon for the link. So you can create a button or a group of of regular CTAs. But if you wanted to create a secondary menu like legal links or any other secondary menu, you could use the legal links field. And then you have two areas for rich text boxes, typically used for things like disclaimers, copyrights, but can be used to have any text in different areas in the footer.

2:19:23 - Brad Taylor 
And there's a lot of flexibility there. And you can change the background color. All right, before we jump into each one of these components, we need to talk about these things that we've been chatting about. So we chatted about link navigation a lot in there. Let's start with that one. So we have the internal title. This is a helper title that's for easy finding in Contentful. You have the link style. This is the variant field. So when you have different variants, Of the links for this, you can choose from the different variants there.

2:20:04 - Brad Taylor 
So by default, we have link, link bolded, a group, a label, a locale list, a button outlined, a button contain, and featured. All of these can be styled to your preferences. Then we have the link text. This is the text that will be displayed in the navigation to the user. It will be on the button if you chose that type of style, but basically the link, the text that the user sees. The link content, this is where the link, the per, the, the, this is if you were linking to a page that is internal.

2:20:49 - Brad Taylor 
So you have by default, page general, page person, page blog. But any page that generates a path, you can simply just select that here. It's important to link the content as opposed to the next field, which is manual URL. If you are linking this to an outside URL, you can put that here. So if you're linking internally, always use link content. If you're linking externally, use manual URL. You have the summary, which is used for rich text. This is good for when this link is part of a MegaNav.

2:21:38 - Brad Taylor 
Media, this could be next to it. Once again, useful for me Mega navs and fly outs. Sub navigation this is if you want to create nested navigation. So we have navigation, but then it can have its own children. This is what you would want to use for flyouts. So for instance, if you have products and then you wanted to have a subnavigation of all the children, you would add subnavigation Um, entries and then alt text, which is used for the media item, uh, for ADA accessibility.

2:22:17 - Adam Harris 
And also the, and also for the, the link itself.

2:22:22 - Brad Taylor 
And for the link itself. Okay. So then the other one that we talked about a lot was link CTA. So the difference between when you want to use a link CTA and a link navigation, So link navigation is only used when you're creating menus and sub-navigation flyouts. There's different fields in there that are specifically used for navigation collections versus link CTA is when you want to create a new internal or external link to something so that you can reuse that object in different places.

2:23:07 - Brad Taylor 
Once again, we have internal title. We have the variants. So this is where you can style the different links. By default, we have link, button text, button outline and button contained. You can choose the content to LinkedIn and just like in navigation, you can link to any Oh, interesting, this doesn't have it. You can link to any page that generates a path if you are link if this CTA goes to something internally. And you can also create a manual link if you're creating a link to something externally.

2:23:54 - Brad Taylor 
The text, this is the text that is in the link. And then the icon, the icon position. If you wanna be able to style this. The color, the target, and the alt text. So these are all pieces that you can style, part of the brand, part of the target determines where that it, you know, what are the options here?

2:24:24 - Adam Harris 
Opens in a new window.

2:24:27 - Brad Taylor 
Oh yeah. So target you, this is how the link reacts. So you can, by default, it'll just go to the next page in the same tab. New window will actually open up a new tab. Same window will act the same as default. Parent window?

2:24:49 - Adam Harris 
Default will, if it's an external URL, if the URL starts with HTTP or anything, FTP, it'll open that in a new window. But if you wanted to force it to open in a new window or same window, you can use those options.

2:25:12 - Brad Taylor 
So the only time that you need to use a link CTA adding these as related entries to things like cards and other content entries that have links to these. Just note that you can, in a rich text editor, if you don't need to have a special style for the link, you can just highlight it and link it in there as well.

2:25:50 - Adam Harris 
Right? Yeah, I would say you want to use link CTA when you want to change the style of a link or link externally. But if possible, a believe in card, it will let you link directly to a page and it'll use whatever the card style is.

2:26:22 - Brad Taylor 
So the other kind of pieces that we'll see a lot of as we go through these are these elements. So we're going to go through these elements. These are the where link CTA, link navigation are Legos. Think of them as Legos. Elements are a different form that kind of incorporates some of these smaller bits. So we'll start with element form.

2:26:56 - Adam Harris 
So element form is generally used for either setting up the settings if you're using a third party, such as HubSpot or Marketo, Form Spree Um, you can, you can use Form to set the IDs. And this, by default, Form Connect can also be its own page if you wanted to have its own slug and parent page. We can have an intro text. It can have a variance, which, can you click on it? I think by default, it's one column, or at least by default. But if you wanted to set it up so it showed differently one column versus two columns, you can use the variant field.

2:27:52 - Adam Harris 
The HubSpot ID and the Form ID, Portal ID and Form ID can be added in here. If there was another third party, these additional fields could be added. The successful confirmation URL path. So if you want to override whatever the form provider is doing, you can add a different URL for the user to go to. Let's see if successfully completed the form. There's also a submission content items. So if you did not want to redirect them, rather you wanted to show them different content once they've submitted the form, there's a reference field to add other content types, content items too.

2:28:42 - Adam Harris 
It's also SEO field using the last rev SEO UI extension. You also have the ability to override the header and the footer for this form if it's being shown as a page. So a common use case for this. Might be somebody running an ad on a third-party Google Ads. When the user clicks, they want to take them to a form, but they want to show them a different header and footer that might not have as many links on it to try to keep them on the page more.

2:29:25 - Brad Taylor 
I mean, one way that I plan on using this, I like that this can be its own page because this is everything that you need to also do like gated content. So usually you just have, you know, your intro, which would be your side text. You could have a different variant of the different landing pages. You have what form you actually want to display in there. And then, you know, what content item do you want to say after you submit it? And then the footer override, you could add, you know, your trust ones, your logos, your other things so that you have a standard, you know, over footer for those.

2:30:04 - Brad Taylor 
This can be how you can launch lead magnet pages very quickly too for B2B sales.

2:30:14 - Adam Harris 
And then a footer disclaimer override if the disclaimer needs to change.

2:30:20 - Brad Taylor 
Cool. So that's the element form. So element form. So, uh, so. The next one we have is an element image. So the main reason that we have an image content entry model content type is because the asset object is not configurable. So when you want to do things like have multiple assets, have assets fall back for different responsive, have different fields for alt text, have them link to any other place. You will need to create a media entry that links to an asset field. So in the element image, which is the content type element image.

2:31:16 - Brad Taylor 
You have an internal title, which is the easy way to find it inside of Contentful. Then you have your main asset. This is the main image or media item that is going to be used. You can also overwrite the tablet for responsive tablets. And then you can also overwrite the mobile if you want to have a different image for the mobile responsiveness. There's also an area for the link text or for the alt text to change that. And then also too, if you need to link this image to something, you can reference it to any page and any CTA.

2:32:09 - Brad Taylor 
Then we have element text. And tell me about this.

2:32:20 - Adam Harris 
Element texts is generally used for a one-off text block. This could be used either within a section or within a block as the supplemental content. It's also used if there's an intro text above an item. So in adding the reference, you'd be adding this element text. Element text has an internal title for easy reference for editors internally to Contentful. As a layout style, which acts as the variant. This can be anything from default, intro text, or whatever the developers wanted to extend it to.

2:33:10 - Adam Harris 
Depending on how it's used in the code, the variant would be automatically set. If it was used as intro text in a block, for example, intro text would be passed in as the variant, so it could be styled properly. Overline, also sometimes called an eyebrow, is generally much smaller text that usually appears right above the title. It's usually one or two words. Title field is going to be like a header in your text, generally like the largest text that the end user would see on the website.

2:33:58 - Adam Harris 
Usually it would be rendered as like an H2 or an H3. Subtitle, but it would generally show underneath the title. And it is generally also a header, but of lower H three or four. Body is a rich text field. This is going to be used for more freeform content and generally can add headers to this, but it's generally just mostly text or other components added as embedded items. And text alignment, so whether this should be left, center, right, or justified.

2:34:51 - Brad Taylor 
So the philosophy behind this component is that there are many times where you want to have structured styles for things like overlines, things like your titles, making sure they use the same H all the time, same subtitle uses the exact same headings here, mainly for consistent styling. They're all not required and technically you can use then the body and you can do the rich text and they can add different headings. We strongly encourage you to configure your rich text editor to meet your needs for consistent styling.

2:35:35 - Brad Taylor 
Also, you can use this as a free area with the rich text to just have a free form block too with embedded entries. The next one, element videos. So this is when you want to bring in a video and embed that on the website. Currently, we support YouTube, Vimeo, and Wistia.

2:36:19 - Adam Harris 
Contentful.

2:36:22 - Brad Taylor 
What was that?

2:36:23 - Adam Harris 
Yeah, you can put a contemptible. And Contentful.

2:36:26 - Brad Taylor 
So here we have our internal title. This is the title that makes it easy to find in Contentful. The title, this can be used when showing the video. The alt text, this is used for the alt text. Placeholder image. This is the image that is shown before the user clicks play. It can also be used while the images or while the video is loading. The asset URL, this is where you paste in the URL of the video. Once again, you can paste in a YouTube URL, a Wistia URL, or a Vimeo URL. If this is a Contentful hosted asset, you can add that to the main asset.

2:37:30 - Brad Taylor 
Media field. And then if you want to have a different one for tablets, you have a field for that, and you have a different field for mobile video. There is a flag for autoplay for all of the videos. What's link? Is that going away? Yeah, so if you want to add a video, you can use the element video. So those are the main pieces that most of this is made up of Now, if you want to create a brand new page on your site, there are the main landing page and the main pages are going to be your page-general.

2:38:28 - Brad Taylor 
This is use case is for any page like your home page, main product pages, main landing pages, main index pages. This is going to be your most configurable page where you can add different sections of subcomponents. You can overwrite the header, you can overwrite the footer. This is your go-to place to create a brand new page. Here you have internal title, which is an easy way to go into it and find it. You have your parent page. So if this page is a child page of another page, you can choose its parent.

2:39:15 - Brad Taylor 
A good example of this blogs and then you wanted to have a sub section sub page of blogs you could choose blogs as the parent page so there would be forward slash blogs forward slash whatever this slug is which the slug is just the relative path so if the page is forward slash blogs forward slash artificial intelligence, then the slug would just be artificial-intelligence. The title, this is used when bringing it in as a link. Is that correct?

2:40:08 - Adam Harris 
Correct.

2:40:09 - Brad Taylor 
Where else is the title used?

2:40:16 - Adam Harris 
The title's also used for cards. The card title, if this is added and shown as a card, shown for search results titles, as well as a fallback for SEO.

2:40:41 - Brad Taylor 
Then we have our hero. So the hero is the very first component at the top. It's generally reserved for the single H1 header. You can reference it and have your different hero components there. It is a subcomponent, but it is reserved for the very top place. Anything else you want to talk about that in the philosophy of why that's separated from just taking the first one from the contents because what's the difference between a hero and a block.

2:41:22 - Adam Harris 
I'm in an effort to not overload block, and to have different variants and rules for hero. For what goes on top, here it was separated. And this also allows you to do things easier, to scroll down to main content and to basically change the variant, how it's rendered, like H1s and H2s.

2:41:59 - Brad Taylor 
So then we have content. So these are going to be all of the components. The content module mapping that we forgot to go over in the code. So this is going to be a list of all the main sections. So in the contents you can have things like collections, block quotes, section, you can add element text, you can add blocks, you can add collection dynamics, collection expandable, element image, And any other components that you want to allow to have a full horizontal section. Think of the contents as your full horizontal sections of the web page.

2:43:03 - Brad Taylor 
What are these?

2:43:04 - Adam Harris 
Promo summary is used mostly on cards and search results. So when creating a page, in order to avoid having to create cards every time you wanted to show this, you can set a default here in the promo summary, which would be used as a summary on a card or however you'd like to use it. Similar to that is the promo image can be used for cards, can be used on search results, and so this lets you set a default promo image for those use cases.

2:43:49 - Brad Taylor 
So then you have SEO. So this is the SEO of this particular page. If this is not set, then it will default to the settings in the site settings. Disable back to top. This will by default will put at the bottom of the page a little back to top icon. This disables it if you don't want that. Then you have the ability to overwrite a header. This allows you to create entirely new sections, entirely new microsites using the same component interface. So you're allowed to override the header.

2:44:36 - Brad Taylor 
You're also allowed to override the footer per each page. And then specifically, I guess the footer disclaimer, why wouldn't you just create a new footer? I guess it's just a helper. Why would you...

2:44:50 - Adam Harris 
Much easier. To create a new footer.

2:44:51 - Brad Taylor 
Much easier.

2:44:52 - Adam Harris 
You have to add all the links and the logo and everything. So this is a quick way to override that particular field.

2:44:59 - Brad Taylor 
Okay. It's more common. So if you want to create a landing page, a main index page that uses your main components, page general is where it is. Now for pages that are typically high content creation, blogs, resources, people, that have a very structured content, we recommend creating page content types for them. And the ones that we have that come with our starter are the page blog and page person. So Adam, take it away.

2:45:45 - Adam Harris 
So page blog is a lot of similarities to page general where it has the title of the blog. This will be used by default in the hero as well as for the browser page title and fallback for SEO and for cards and search results. As a parent page. So this will allow you to link it to a page general for both the full, to create the full path, as well as for breadcrumbs. It has-. Is.

2:46:27 - Brad Taylor 
This. So that too, if you want to have multiple blogs, you could have indexes. You could set up a different index page and then have a different parent page for each blog post.

2:46:39 - Adam Harris 
Yes. And we have a slug field, which should just be the last part of this, the path. There should not be any slashes in the slug field. Publish date. So this is the date that the editors manually choose when the blog was posted. We use this versus the Contentful created date because the date might be in the future, it might be in the past, if it was from a migration, and so this gives the editors more control over what that date actually is.

2:47:22 - Brad Taylor 
And if you wanted to overwrite that and use the create date, you could go into the extension and make the change there.

2:47:31 - Adam Harris 
Author is a reference field to a page person. And this allows to make a connection between the two content items. So this makes the editor does not have to reenter the person's information every time. They can simply create the page person once and link it here. It can also be used if set up in the code base to be able to pull all blogs that a specific author wrote. It can also be used to pull in that author information on the blog page to show their image and title and whatever else is needed.

2:48:22 - Adam Harris 
Featured media, this is used by default in the hero, but depending on the final styles could also be shown differently below the hero. It's really up to the designers. But this is meant to be shown by default on the detail page for this blog. It will be used as the fallback to the promo image on cards if promo image is not filled out. Body is a rich text field. This allows the user to add in long form content, as well as embed other components into it. But it is meant more for long form content versus References.

2:49:18 - Adam Harris 
Categories are references to a blog category content type. This is meant for more structured linking and grouping of blogs. This can be used also for filtering in search results or showing it, creating specific blog paths when using the paths config extension. Tags are more freeform as a list of different tags that might be unique to this blog, similar to hashtags. Promo summary, similar to page general, in that it is used for the cards. So linking to, showing logs in a collection or in a search results list, a promo summary will be used.

2:50:25 - Adam Harris 
And promo image will also be used on cards and search results. If this is not filled out, the featured media will, it will fall back to the featured media placement. Related items, this is a way to manually choose which items are related to this blog. So the other blogs, and this can also be set up to be automatic based on whatever logic is preferred coming from search results.

2:51:01 - Brad Taylor 
How do you set that up?

2:51:03 - Adam Harris 
Which part?

2:51:05 - Brad Taylor 
Automatic.

2:51:08 - Adam Harris 
You go into the extension and you can either have to make an Algolia query. Yes.

2:51:15 - Brad Taylor 
It requires a developer. Okay. That's okay. We'll leave it at that for right now. Okay. And then the SEO for this. So, Just not to be confused, tags is not Contentful tags. Tags is used for hashtags and for free form. And also too, categories is for structured, you know, so that you can have predefined lists. Question on that. Is there a reason we don't use Contentful tags? I know we can't use it for our tags because they have a 100 limit, but for categories?

2:52:11 - Adam Harris 
Temple doesn't have a strong solution for nested categories and localization of the categories.

2:52:22 - Brad Taylor 
Okay. That is why we do not use that. Alright, our next one is person. So this is so that you can create a bio that you can then link from your blogs or for any other for any other person that you want to show on your website. But for the starter, it's primarily for blogs. So you have their name, their parent page. So this is so that you could create index pages. For instance, if you had different teams of people, you have the slug. Once again, this is just the last part. There should be no slashes in it.

2:53:18 - Brad Taylor 
It should just be the last part of the slug. And then we have fields for job title, education, any previous experiences. Main image, an image when you roll over their I, that, that shows when you actually hover over their image, their details, any of their social links which go to link CTAs. Email, and then promo summary if they're shown in a card, promo image if they're shown in like a card or a search result, both for promos, and then header override so you can override the header and footer as well, as well as have their own SEO.

2:54:06 - Brad Taylor 
So with the two pages, so with the blog and the person, these are just two examples of structured content that you could also, you know, repurpose. So if you wanted to create an article content type, if you wanted to create a, you know, resource content type, you could use these as starters to help, create your own structured content. A good rule of thumb is that if you're going to be creating lots of these in the same format, create a structured page. If you want to have more, if they're created less often and you want to have more configurability, use the page general.

2:54:49 - Brad Taylor 
So when you're creating your page general or you're setting up any of your other pages, we have different sections that you can do. And the main one that we use is called block. Take it away.

2:55:06 - Adam Harris 
Yes. So blocks are meant for generally two column layouts and consist of, those layouts might have, they'll have a overline, which is small, usually smaller text that appears above the title, a title text field, which is generally shown as like an H3, Subtitle field, which is generally shown as an H4. Body field. Which is meant mostly just for paragraph, maybe style content. Headers are typically frowned upon in here because this is meant to be a structured, more structured design, and you have overline title and subtitle.

2:56:05 - Adam Harris 
You cannot embed anything in the body of a block rich text field. Actions, this would be links, CTAs that would show on the block. You can have multiple of them. And you also have the ability to do a quick media asset. So this is going to be a media field, but you can also do supplemental content, which is a reference field. This would typically be for like element text that you wanted to show. You can also select the background image to show behind the entire section row of the block. And you can set the theme of the background color of this.

2:56:51 - Adam Harris 
The variance of these fields, you can click on that, is going to be the content on right, which would put the quick media asset or the supplemental content, if the quick media asset does not exist, on the right side, and the title, overline, subtitle, body, and actions on the left side. Content on write full bleed is similar to content on write, except for it will go to the full bleed and break out of the container. Just for the media and the supplemental content. It's recommended to only do that for when you're using a media asset.

2:57:35 - Adam Harris 
Content on left, we'll put the media asset and the supplemental content on the left side, and the title, overline, et cetera, on the right. Content on left full bleed will also put the media asset or supplemental content on the left, but we'll have it break out of the container. And it's recommended to only do this when using a media asset. Content above will put the media asset or the supplemental content above the title. This is generally good for when you want to have like an intro image before the content.

2:58:18 - Adam Harris 
Content below would put that content media asset or supplemental content below the title. This is generally used when the content is centered and a little bit thinner. And then there's also, can also have intro text to the block. The intro text is an element text field. This is helpful. It's generally the title and overline shown there is usually larger and spans the entire row or whatever the design and the code is set up for. So a block is heavily used across sites. That are looking for two column layouts and larger amounts of content without having to create as many content items.

2:59:10 - Brad Taylor 
Yeah, so when you would use the quick media asset, this is when you just want to do a quick image. You just have an image on the right that's over there. But if you wanted to do something that's a little bit more involved, like if you wanted to embed a form, if you wanted to embed a video, if you wanted to have an image that linked out because you had to use a media element image, you would use the supplemental content, correct?

2:59:36 - Adam Harris 
Correct.

2:59:37 - Brad Taylor 
All right, and then background image. This is to change the entire background image and then background color too. I'm assuming that background image overrides background color.

2:59:51 - Adam Harris 
It depends on the design, but the background image would show, background color would be used to change the color of the text. There are times when the background color, if the design calls for it, might have an opacity set on it, a transparency of some level to overlay the background image, but still be able to see it and read the text.

3:00:20 - Brad Taylor 
So a little trick could be that you would put the background color and then put an image that has an opacity level so you could have the background color bleed into the front. Yeah, to even do that same style. Because the one you talked about would require a code change, right?

3:00:41 - Adam Harris 
Yeah, you want to have, you need to kind of match the background the background color is mapped to the text color. So if you don't have a background color, but you have a busy image, something a lot going on with the background image, you want to be able to read the text still. So setting a background color is very helpful.

3:01:10 - Brad Taylor 
So then we have here, we have block quote.

3:01:15 - Adam Harris 
Quote is meant for any quotes from people, from different sources, books, magazines, et cetera. So you have an internal title field, which is meant just for easier reference within Contentful. I have a quote, which is a long text field, which is meant for the quote itself. Author name is going to be who this quote is attributed to. Author title is self-explanatory, also a long text field. If there's an image associated with the quote, use the image media reference field. A logo, typically used for a logo of the author or the company.

3:02:09 - Adam Harris 
It's also a media field. And then actions, which is a multi-reference field to link CTAs.

3:02:19 - Brad Taylor 
And this is just two examples. So block is our standard component that is used for many different two column layouts. However, if you do have a need where you want a structured piece of content, you could do other block content models within that same. But the basic concept is that you have a full horizontal structured piece of content. The next one is collections. So let's go through the collections.

3:02:59 - Adam Harris 
So collections are meant as a list of content. So this could be a list of, typically it's a list of cards, or it could also be like a carousel of items. So collections have an internal title for easier reference within Contentful. Those have an intro text reference, the element text field that will be shown above the collection. Layout style, click on that. Let's scroll down. So layout style is going to be effectively like how many columns are going to be shown at the large desktop size.

3:03:51 - Adam Harris 
This could be one per row, two per row, three per row, four per row, or five per row. Those will fall back responsively based on the designs for each one. If you can also have an option to show a carousel, which you can choose the carousel to be shown at mobile, tablet, or desktop sizes. This is a checkbox, so you can select none or one or all of them as you see fit, and it will fall back accordingly. So if you wanted to show a carousel just on mobile, you would select the mobile checkbox, but on desktop, it would show it as the normal collection.

3:04:45 - Adam Harris 
Also an option to autoplay the carousel, which is a true or false Boolean. Item style, you can click on that. This is going to be the style of the items within the collection. This can be, there's a default, default style and icon style, which will show the items within this collection. Usually if you have a media, it would be a much smaller media item with a set size. Logo, which will be, show these as, It's up to the designer, but it can either be shown as just images or the image that's within it would have a specific ratio in the item.

3:05:43 - Adam Harris 
You would see the entire media item so it didn't get cropped.

3:05:47 - Brad Taylor 
This would be what you would use for logo carousels and logo banners. Our logo.

3:05:53 - Adam Harris 
Yes,

3:05:54 - Brad Taylor 
Yeah.

3:05:54 - Adam Harris 
Yeah. You just don't want to. To fit the space but not crop it.

3:05:55 - Brad Taylor 
Click on those logos.

3:06:00 - Adam Harris 
So it would show the entire image. Media. This is can also be used to show like, like an image carousel or more heavily focused on the media of the items in the collection itself. Typically, these would fit the entire space of the item and be cropped. Accordingly, responsively. So you might have some of the, part of the image might not appear if the ratio of the image does not match the space of the item. Pricing. Typically, this is very heavily styled item and it does use the cards or a specific pricing content type that existed.

3:06:58 - Adam Harris 
Typically, the overlying title, subtitle, and actions of the item are heavily styled to look more like pricing cards. Person, person typically would be used either with card or a person content type. These are styled to show a few more fields or to, you don't want the person's image cropped, but you also would likely want it larger. Quote usually has its own style and you would use quote content types for this or a card, but again, heavily styled, typically used in carousels or one or two column layouts.

3:08:00 - Adam Harris 
If this needs to be manually selected, it would show the blogs or show the collection items in a blog format. Typically, this has links to might show the categories of the blog or the tags on the card itself. And this can be extended for any other types of variants or styles as needed.

3:08:27 - Brad Taylor 
So if you want to add or look at the different styles for the different variants of the individual items of cards, you can go into the themes.

3:08:43 - Adam Harris 
Yes, you can go into the card theme.

3:08:49 - Brad Taylor 
Channel. Items, these are the cards.

3:08:55 - Adam Harris 
Yeah, so items can be a reference field. It can be collection items, card, content types, page person, blog quote, page blog, or a page general. So these will all be transformed in the end into cards in the code, and each of the fields will be mapped. So for each, for page person, page blog, and page general, they have promo summary, title, and promo image fields. Those will be used to map to a card dynamically. This helps to avoid having to create cards quite as often. You would use a card when it is a one-off content that you wanted to add to the collection, or if you wanted to override more of the, have more selection over the content that goes into the card that might be a one-off for a page general or page person.

3:10:06 - Brad Taylor 
And if you wanted to uh, add a new, uh, type in here, you would essentially have to update, uh, the extension. Uh, so if I wanted to add, for instance, element form, because I wanted to link to, uh, the different form pages, because that has a URL, I could then update that extension and, um, add that as a,

3:10:43 - Adam Harris 
You have a map, Yeah, you would have. Them.

3:10:44 - Brad Taylor 
I. Could then map the form without having to create a card. So really collection card, this is your, you know, you wanted to create any default or any random card, but generally you're going to want to pick the person, the quote, the blog, or the page, um, directly.

3:11:09 - Adam Harris 
You can also set a background image to show behind the entire collection and intro text. You can set a background color, which will set the background color as well as change the theme of the collection itself and the card styles that go in the collection. If it's on a carousel, this would also change the style of the arrows and the pagination buttons. Accordingly. Actions is used to add any linked CTAs to the collection. These could be shown above or below based on the designs.

3:12:02 - Brad Taylor 
So that's a basic collection of cards. And then we have three other types of collections that we have. And you use the collection when you manually want to select what items you want in that list. But if you wanted to have a dynamic list, you can go into the collection dynamic, where you're going to set an internal title. You can give it intro text, which goes above the collection. Interesting. So we have an items here. Is there going to be removed or?

3:12:42 - Adam Harris 
Items is used if you wanted to have manually put in a specific item at the beginning of the collection.

3:12:52 - Brad Taylor 
Got it. So in items, so if you wanted to put one, maybe two items that are always there, and then have a third, fourth, fifth, sixth item become dynamic, you can manually select what items are in there.

3:13:08 - Adam Harris 
We should come back to this one because we're definitely changing it.

3:13:13 - Brad Taylor 
Okay.

3:13:17 - Adam Harris 
The important part of it, at least.

3:13:21 - Brad Taylor 
But collection dynamic, so layout style, item style, you can say where you want to pull from the content type, pull from which category items, and then how many items to pull. We'll come back to that. So we also have collection expandable. So instead of cards, these are used for...

3:13:44 - Adam Harris 
What collection expandable is meant for kind of multi-level FAQs.

3:13:54 - Adam Harris 
Faqs, tabs, accordions, things that require both a title as well as content that goes underneath it. So Collection Expandable has an intro text reference field, the layout style. This can be by default either tabs or accordion. Um, The expanding items. So this is going to be a collection expandable item content type, which we'll go into, but it mostly consists of the title, a potential reference field for the content or rich text body field. And then actions to allow you to add any CTAs to the collection expandable, as well as a background image and a background color, which will change the background color and the color of the text.

3:15:04 - Adam Harris 
But will. Not.

3:15:04 - Brad Taylor 
So any. Ti so anytime you want to add tabs or accordions to your website, you will go and you will create a collection expandable. And a collections expandable item, which is the item in there, it's a smaller version that it just includes an internal title. The title, which is the part that either shows up on the tab or the accordion that you click on. The body, this is the part that is the body of the tab or the body of the accordion that then gets expanded. Which can be rich text. You can embed other elements in there.

3:15:50 - Brad Taylor 
So you can use text, you can use other components as well to expand and collapse.

3:15:59 - Adam Harris 
You can also do reference content. Don't worry about that one. Reference content will allow you to add other things like a block quote element text to the expandable item.

3:16:17 - Brad Taylor 
So you can either reference one single component or you can use the body and then embed it in the rich text if you need to put text around it on either side. So very configurable. That's what it should do if it does. Alright, now we go into, so we talked about the collections and the dynamic, we didn't talk about the items which are the cards. These are the cards that get created. This is if you need to create a manual card. If you select a page, if you select a blog, if you select these path items inside the collection, it'll automatically generate the card.

3:17:05 - Brad Taylor 
However, there are instances where you want to have full control over creating the card, and that's where you'd create a collection item card. Here you can say what the internal title is, easy for going into Contentful. You can add the media, you can add one, you can add multiple files. So if you want to, if your component, you know, that card wants to have multiple, maybe it's a image slideshow that you can go over. You can add that on there. Overline, so this is, overline is for, you know, structured contents usually above the title, then you have the title, then you have an optional subtitle usually used for authors, maybe perhaps even dates, but usually under the title.

3:17:55 - Brad Taylor 
Then you have your body, which is a rich text field. And then you have the actions. So these are the actions that would be usually denoted as buttons underneath at the bottom of the card. And then if you want the entire card to link to something, you would use the link field. This links the entire card. But if you use the link field, that overwrites the actions, because the entire card becomes a link. So if you use link, do not use actions.

3:18:31 - Adam Harris 
You can use both.

3:18:33 - Brad Taylor 
You can. Oh, cool.

3:18:37 - Adam Harris 
Link will link the entire card actions will show as CTAs.

3:18:45 - Brad Taylor 
All right, so we've talked about all of these. Let's talk lastly about, so categories, category blog. This is when you want to have structured categorization. Also too, when you want to have nested categorization, we have a UI extension as well that, allows you to pick with these categories, but essentially, and it allows you to have details pages for any one of your category blogs. So here you have a title, you have a slug so that you can make that a detail page. You have a hero so that you can have a, you can configure a different type of hero for maybe different blog sections.

3:19:36 - Brad Taylor 
So you can have different background images, things like that. You have the body, so this is a body that would be displayed, that can be displayed on... How's the body used?

3:19:53 - Adam Harris 
The body is used in order to, like, so this is shown as a detail page. This allows the user to add content to the page that would show above. Typically this would have, like, dynamically created collection to show blogs underneath it. So the body allows them to add content above it.

3:20:23 - Brad Taylor 
Got it. Okay. Then promo summary of the end promo image are used if they're brought in to other things like cards. And then you have SEO so that you can have SEO for your different blog sections. We have talked about all the major pieces of it. Then we also have this free form, one called section. Are we keeping this?

3:20:54 - Adam Harris 
We are keeping it.

3:20:55 - Brad Taylor 
Yes, okay. So the when you would want to use a section is this is your free form area for adding different blocks. This is also useful for creating anchors. So if you wanted to create a CTA or a navigation link that links to a particular page or a particular area on the site, you have to wrap it in a section. And by wrapping it in a section, you create this section, and then you would add in the contents field what the content you want is in there. But it allows you to have a layout style. And an anchor name.

3:21:44 - Brad Taylor 
Layout style is for variants. This allows you to have lots of different variants that use the different contents and layouts of other components. Intro text, this is usually above the contents area of it so that you can have centered text, left text, right text. And the contents is really used any way that you want. So for instance, you can have blocks collections quotes element in images. This is so that you can create different layouts using all of the different components.

3:22:28 - Brad Taylor 
That you've put together. So really creating complex elements based off of the building blocks that you've already created. And then you can create your own different types of variants to create templates, create structured sections based off of content that you already have in here. Then you have the background media. So this, once again, you can create a background to either an image or a video. And you can also do background color. So section is your advanced configuration for creating different sections.

3:23:30 - Brad Taylor 
Okay, the AI doesn't care. Alright, so that's it. Oh, module integration. Oh, do we go over here? Hero and module integration. All right, hero.

3:23:55 - Adam Harris 
This one will probably change a little bit, but nothing major. So Hero is very similar to Block in a lot of ways, but Hero has an internal title for easier reference within Contentful for editors. The layout style allows you to place the media that's selected either on the right The right going full bleed, on the left going full bleed. Also has an overline field, small text that appears above the title. Title, which given this is a hero would be an H1 on the page. Subtitle, it's generally an H2 or an H3.

3:24:45 - Adam Harris 
A rich text body field that is typically meant just for potentially formatted text, but not having embedded items. And then an actions field, which is a multi-reference to the CTA link for any links or buttons that need to be shown. Also a background color that allows for the background color to be changed, as well as a background image. It uses an element image. The side items is multi-reference. Typically it is used for an element image. It is using an element image here versus a media item because we're loading optimizations and typically people would like to have more control over like what shows on tablet, mobile and desktop for Heroes.

3:25:52 - Adam Harris 
A form could also be added as a side image item.

3:26:00 - Brad Taylor 
Okay, and module integration.

3:26:07 - Adam Harris 
Module integration is meant usually for third party integrations. This could be things like third-party script or some sort of iframe. This needs to be set up by developers. You would choose, you would have to set up the different variants. It is effectively going to be mapping to a custom component that typically has a more complex logic associated with it, but we want to keep it as easy as possible for editors. It also has settings JSON field. This can be used to manually pass in props to that component.

3:27:01 - Adam Harris 
This is overall a more advanced feature in module integration. So,

3:27:11 - Brad Taylor 
And we're going to have, we have Marketo HubSpot. What do we have by theme? What do we have by default or what's going to be in there by default that we've done?

3:27:30 - Adam Harris 
Um, HubSpot is in there by default. We'll also have styling for Well, module integration would have the ability to use Netlify Forms, Forms-free on Vercel. And Marchetto styling integration.

3:28:04 - Brad Taylor 
With more to come. All right. And that's a wrap.