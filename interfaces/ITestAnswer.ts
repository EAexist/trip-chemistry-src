import { ICityType } from "~/common/app-const";
import { ActivityTag, IActivityTag } from "./enums/ActivityTag";
import { ExpectationTag, IExpectationTag } from "./enums/ExpectationTag";
import { CityTag, ICityTag } from "./enums/CityTag";

export interface ITestAnswer {
    hashtag: {
        expectation: IExpectationTag[],
        // {
        //     selected: IExpectationTag[]
        //     unSelected: IExpectationTag[]
        // },
        activity: 
        IActivityTag[],
        // {
        //     selected: IActivityTag[]
        //     unSelected: IActivityTag[]
        // },
        city: 
        ICityTag[],
        // {
        //     selected: ICityTag[]
        //     unSelected: ICityTag[]
        // }
    }
    leadership?: number
    schedule: {
        startTime?: number
        endTime?: number
        schedule?: number
        nightPlan?: number
    }
    restaurant: {
        dailyBudget?: number
        specialBudget?: number
        specialCount?: number
        price?: number
        taste?: number
        uniqueness?: number
        popularity?: number
    }
    city?: Record<ICityType, ( undefined | number )>
};

export interface ITestAnswerDTO extends ITestAnswer {}

// extends Omit<ITestAnswer, 'hashtag'> {
//     hashtag:{
//         expectation: IExpectationTag[],
//         activity: IActivityTag[],
//         city: ICityTag[],
//     }
// };

export const defaultTestAnswer: ITestAnswer = {
    hashtag:{
        expectation: 
    [],
    // {
    //         selected: [],
    //         unSelected: Object.values(ExpectationTag)
    //     },
        activity: 
    [],
    // {
    //         selected: [],
    //         unSelected: Object.values(ActivityTag)
    //     },
        city: 
    [],
    // {
    //         selected: [],
    //         unSelected: Object.values(CityTag)
    //     },
    },
    leadership: undefined,
    schedule: {
        startTime: undefined,
        endTime: undefined,
        schedule: undefined,
        nightPlan: undefined
    },
    restaurant:{
        dailyBudget: undefined,
        specialBudget: undefined,
        specialCount: undefined,
    },
};

export type ITestKey = keyof ITestAnswer;
export type INumericTestKey = keyof Omit<ITestAnswer, "hashtag">;
export type IHashTagTestKey = keyof typeof defaultTestAnswer.hashtag;
export const HashTagTestKeys: string[] = [ "activity", "expectation" ] as const;