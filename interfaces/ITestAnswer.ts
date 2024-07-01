import { ICityType } from "~/common/app-const";
import { ActivityTag, IActivityTag } from "./enums/ActivityTag";
import { ExpectationTag, IExpectationTag } from "./enums/ExpectationTag";
import { CityTag, ICityTag } from "./enums/CityTag";

export interface ITestAnswer {
    hashtag: {
        expectation: {
            selected: IExpectationTag[]
            unSelected: IExpectationTag[]
        },
        activity: {
            selected: IActivityTag[]
            unSelected: IActivityTag[]
        },
        city: {
            selected: ICityTag[]
            unSelected: ICityTag[]
        }
    }
    leadership: undefined | number
    schedule: {
        startTime: undefined | number
        endTime: undefined | number
        schedule: undefined | number
        nightPlan: undefined | number
    }
    restaurant: {
        dailyBudget: undefined | number
        specialBudget: undefined | number
        specialCount: undefined | number
    }
    city: Record<ICityType, ( undefined | number )>
};

export interface ITestAnswerDTO extends Omit<ITestAnswer, 'hashtag'> {
    hashtag:{
        expectation: IExpectationTag[],
        activity: IActivityTag[],
        city: ICityTag[],
    }
};

export const defaultTestAnswer: ITestAnswer = {
    hashtag:{
        expectation: {
            selected: [],
            unSelected: Object.values(ExpectationTag)
        },
        activity: {
            selected: [],
            unSelected: Object.values(ActivityTag)
        },
        city: {
            selected: [],
            unSelected: Object.values(CityTag)
        },
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
    city:{
        metropolis: undefined,
        history: undefined,
        nature: undefined,
        small: undefined,
    }
};

export const testAnswerToDTO: (testAnswer: ITestAnswer) => ITestAnswerDTO = ( testAnswer ) => (
    {
        ...testAnswer,
        hashtag: {
            expectation: testAnswer.hashtag.expectation.selected,
            activity: testAnswer.hashtag.activity.selected,
            city: testAnswer.hashtag.city.selected,
        }
    } as ITestAnswerDTO
);

export type ITestKey = keyof ITestAnswer;
export type INumericTestKey = keyof Omit<ITestAnswer, "hashtag">;
export type IHashTagTestKey = keyof typeof defaultTestAnswer.hashtag;
export const HashTagTestKeys: string[] = [ "activity", "expectation" ] as const;