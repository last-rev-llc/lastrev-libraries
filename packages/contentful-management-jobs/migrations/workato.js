const contentfulFieldsParsers = require('../shared/contentful-fields');

const createMediaEntry = (assetId, asset_url, assetRefObject, height, width) => {
    // We use the same ID for the asset and the media entry.
    return {
        entryId: assetId,
        contentType: 'media',
        contentfulFields: {
            asset_url: {
                'en-US': asset_url
            },
            asset: {
                'en-US': assetRefObject
            },
            height: {
                'en-US': height
            },
            width: {
                'en-US': width
            }
        }
    }
}

const createLinkEntry = (entryId, manual_url, text) => {
    return {
        entryId: entryId,
        contentType: 'link',
        contentfulFields: {
            manual_url: {
                'en-US': manual_url
            },
            text: {
                'en-US': text
            }
        }
    }
}

const createCardEntry = (entryId, title, linkRefObj, mediaRefObj, category) => {
    return {
        entryId: entryId,
        contentType: 'card',
        contentfulFields: {
            title: {
                'en-US': title
            },
            link: {
                'en-US': linkRefObj
            },
            img: {
                'en-US': mediaRefObj
            },
            category: {
                'en-US': category
            }
        }
    }
}

const createEditionTabApp = async (JOB, entryId, {internalTitle, name, apps}) => {
    try {
        const appsRelArray = [];
        for (let index = 0; index < apps.length; index++) {
            const app = apps[index];
            const internalTitle = `Edition App Flow Logo - ${app.name}`;
            const entryId = await contentfulFieldsParsers.getContentfulIdFromString(internalTitle);
            JOB.relatedEntries.push(await createEditionTabApp(JOB, entryId, {
                internalTitle,
                name: app.name,
                apps: [],
            }));
    
            const relTabObj = await contentfulFieldsParsers.getContentfulFieldValue(entryId, {type: 'Entry'});
            // console.log('relTabObj: ', relTabObj);
    
            appsRelArray.push(relTabObj);
        }
    } catch (err) {
        console.log('err: ', err);
    }
    return {
        entryId: entryId,
        contentType: 'editionTabApp',
        contentfulFields: {
            internalTitle: {
                'en-US': internalTitle
            },
            name: {
                'en-US': name
            },
            apps: {
                'en-US': []
            }
        }
    }
}

const createEditionTab = async (JOB, entryId, {internalTitle, name, title, text, apps_flow}) => {

    const appsRelArray = [];
    for (let index = 0; index < apps_flow.length; index++) {
        const app = apps_flow[index];
        const internalTitle = `Edition App Flow - ${app.name}`;
        const entryId = await contentfulFieldsParsers.getContentfulIdFromString(internalTitle);

        JOB.relatedEntries.push(await createEditionTabApp(JOB, entryId, {
            internalTitle,
            name: app.name,
            apps: [],
        }));

        const relTabObj = await contentfulFieldsParsers.getContentfulFieldValue(entryId, {type: 'Entry'});
        // console.log('relTabObj: ', relTabObj);

        appsRelArray.push(relTabObj);
    }

    return {
        entryId: entryId,
        contentType: 'editionTab',
        contentfulFields: {
            internalTitle: {
                'en-US': internalTitle
            },
            name: {
                'en-US': name
            },
            title: {
                'en-US': title
            },
            text: {
                'en-US': text
            },
            apps_flow: {
                'en-US': []
            }
        }
    }
}

const accelerators = {
    // Accelerators https://preview.contentful.com/spaces/khy5qy7zbpmq/environments/yaml-test/entries/17SMWU8LKtTnB6j2Do7lkn?access_token=ufBVTLIcMVUxgGcMA7EXrNWerJPPbmrEK9Eg-zHDceA
    chart: {
        id: 'chart2x',
        type: 'CustomParser',
        customParser: async (value, JOB) => {
            // console.log('============== chart CustomParser', value);
            const assetId = await contentfulFieldsParsers.getContentfulIdFromString(value);
            // console.log('assetId: ', assetId);
            const asset = await contentfulFieldsParsers.getContentfulFieldValue(assetId, {type: 'Asset'});
            // console.log('assetObject: ', assetObject);

            createMediaEntry(assetId, value, asset);
            JOB.relatedEntries.push(createMediaEntry(assetId, value, asset));
            
            const entryObject = await contentfulFieldsParsers.getContentfulFieldValue(assetId, {type: 'Entry'});
            // console.log('entryObject: ', entryObject);
            return entryObject;
        }
    },
    about_rich_text: {
        id: 'about',
        type: 'CustomParser',
        customParser: async (value) => {
            // console.log('============== about_rich_text CustomParser', value);
            return await contentfulFieldsParsers.getContentfulFieldValue(value, {type: 'RichText'});
        }
    },
    related_content_title: {
        id: 'related_content.title',
        type: 'CustomParser',
        customParser: async (value) => {
            return await contentfulFieldsParsers.getContentfulFieldValue(value, {type: 'Symbol'});
        }

    },
    related_content_list: {
      id: 'related_content.list',
      type: 'CustomParser',
      customParser: async (array, JOB) => {
        const relatedArray = [];
        if (array && array.length > 0) {
            for (let index = 0; index < array.length; index++) {
                const card = array[index];
                const entryId = await contentfulFieldsParsers.getContentfulIdFromString(`${card.title}+${card.link}`);
                const assetId = await contentfulFieldsParsers.getContentfulIdFromString(`${card.img2}`);
                const mediaId = await contentfulFieldsParsers.getContentfulIdFromString(`media-${card.img2}`);
                console.log('mediaId: ', mediaId, card.title);
                const linkId = await contentfulFieldsParsers.getContentfulIdFromString(`link-${card.link}`);
                // console.log('assetId: ', assetId);
                const assetRefObject = await contentfulFieldsParsers.getContentfulFieldValue(assetId, {type: 'Asset'});
                const mediaRefObject = await contentfulFieldsParsers.getContentfulFieldValue(mediaId, {type: 'Entry'});
                const linkRefObject = await contentfulFieldsParsers.getContentfulFieldValue(linkId, {type: 'Entry'});
                const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, {type: 'Entry'});
                
                // console.log('assetObject: ', assetObject);
                // Add the related entries first
                JOB.relatedEntries.push(createMediaEntry(assetId, card.img2, assetRefObject));
                JOB.relatedEntries.push(createLinkEntry(linkId, card.link, 'View More'));
                JOB.relatedEntries.push(createCardEntry(entryId, card.title, linkRefObject, mediaRefObject, card.category));
                // Add the reference array to add to your entry
                relatedArray.push(cardRefObject);
            }  
        }
        return relatedArray;
      }
    },
}


const customerStory = {
    logo: {
        id: 'logo_path',
        type: 'CustomParser',
        customParser: async (value, JOB) => {
            // console.log('============== logo CustomParser', value);
            const assetId = await contentfulFieldsParsers.getContentfulIdFromString(value);
            // console.log('assetId: ', assetId);
            const assetRefObj = await contentfulFieldsParsers.getContentfulFieldValue(assetId, {type: 'Asset'});
            // console.log('assetObject: ', assetObject);

            JOB.relatedEntries.push(createMediaEntry(assetId, value, asset));
            return assetRefObj;
        }
    },
    info_statistic: null,
}

const pageEdition = {
    image: {
        id: 'image',
        type: 'CustomParser',
        customParser: async (value, JOB) => {
            // console.log('============== image CustomParser', value);
            const assetId = await contentfulFieldsParsers.getContentfulIdFromString(value);
            // console.log('assetId: ', assetId);
            const assetRefObj = await contentfulFieldsParsers.getContentfulFieldValue(assetId, {type: 'Asset'});

            return assetRefObj;
        }
    },
    steps_title: {
        id: 'steps.title',
        type: 'CustomParser',
        customParser: async (value, JOB) => {
            return await contentfulFieldsParsers.getContentfulFieldValue(value, {type: 'Symbol'});
        }
    },
    steps_list: {
        id: 'steps.list',
        type: 'CustomParser',
        customParser: async (array, JOB) => {
            // Return an array of the 'title' fields
            const stepsArray = array.map((step) => {
                return step.title;
            });
            return stepsArray;
        }
    },
    tabs: {
        id: 'tabs',
        type: 'CustomParser',
        customParser: async (array, JOB, yamlObj) => {
            // console.log('yamlObj: ', yamlObj);
            const tabsRelArray = [];
            for (let index = 0; index < array.length; index++) {
                const tab = array[index];
                const internalTitle = `Edition - ${yamlObj.parsedYamlFile.title} - ${tab.name}`;
                const entryId = await contentfulFieldsParsers.getContentfulIdFromString(internalTitle);
                JOB.relatedEntries.push(await createEditionTab(JOB, entryId, {
                    internalTitle,
                    name: tab.name,
                    title: tab.functions[0].title,
                    text: tab.functions[0].text,
                    apps_flow: tab.functions[0].apps_flow,
                }));

                const relTabObj = await contentfulFieldsParsers.getContentfulFieldValue(entryId, {type: 'Entry'});
                // console.log('relTabObj: ', relTabObj);

                tabsRelArray.push(relTabObj);
            }
            
            // console.log('tabsArray: ', tabsRelArray);
            return tabsRelArray;
        }
    },
    calloutsList: null,

}
module.exports = {
    accelerators,
    customerStory,
    pageEdition
}