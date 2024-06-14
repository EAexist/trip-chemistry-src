/* React */
import { useState, createContext, useContext, PropsWithChildren } from 'react';

import baseLangStrings from './stringTable_kr';

// type LangKey = "ko-kr";
type JsonLocalizedStrings = typeof baseLangStrings;

const baseTextContext = createContext<JsonLocalizedStrings>(baseLangStrings);
const TextProvidingWrapper = baseTextContext.Provider;

function AggregateTextProvider({ children }: PropsWithChildren){

    const [ langStrings, setLangStrings ] = useState<JsonLocalizedStrings>(baseLangStrings);

    return (
        <TextProvidingWrapper value={langStrings}>
            {children}
        </TextProvidingWrapper>
    );
}

/* https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking */
const ContentKey = {
    Home: "home", 
    Test : "test",
    Result : "result",
    Chemistry : "chemistry"
} as const;

type ContentKey = typeof ContentKey[keyof typeof ContentKey]; 
// type TestContentStrings = typeof 

// type TextKey = keyof (typeof baseLangStrings["public"]);

function useContentString( key: ContentKey ) {
    const strings = useContext(baseTextContext).public.contents[key];
    
    switch ( key )
    {
        case "test":
            break;
        default :
            break;
    }
 
    // return strings as (typeof strings);
    return strings;
}

// interface useTestStringProps {
//     testKey: ITestKey;
//     subTestKey?: SubTestKey;
// };
// function useTestString({ testKey, subTestKey }: useTestStringProps) {

//     const baseStrings = usePageString('test')[testKey as ITestKey];

//     return(
//         subTestKey ? baseStrings.subTests[subTestKey as SubTestKey] : baseStrings
//     );
// }

// function useString(key: TextKey) {
//     return Object(useContext(baseTextContext).public[key]);
// }

function useStrings() {
    const strings = useContext(baseTextContext);
    return strings as typeof strings;
}

// function usePageAsset(page: Page) {
    // return useContext(baseTextContext).public.assets[page];
// }

export { AggregateTextProvider, useStrings, useContentString, ContentKey }
export type {  }  