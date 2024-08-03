// import { ICityType } from "../common/app-const";
import { IActivityTag } from "./enums/ActivityTag";
import { ICityTag } from "./enums/CityTag";
import { IExpectationTag } from "./enums/ExpectationTag";

export interface ITestAnswer {
    hashtag: {
        expectation: IExpectationTag[],
        activity: IActivityTag[],
        city: ICityTag[],
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
    // city?: Record<ICityType, ( undefined | number )>
};

export interface ITestAnswerDTO extends ITestAnswer {}

export const testAnswerToDTO = (testAnswer: ITestAnswer) => ({
    ...testAnswer,
    leadership: (testAnswer.leadership !== undefined) ? testAnswer.leadership : -1 
})

export const DTOToTestAnswer = (testAnswerDTO: ITestAnswerDTO) => ({
    ...testAnswerDTO,
    leadership: (testAnswerDTO && testAnswerDTO.leadership && (testAnswerDTO.leadership > -1)) ? testAnswerDTO.leadership : undefined
})

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