import { CITY_TYPES, ICityType } from "~/common/app-const";
import { ActivityTag, IActivityTag } from "./enums/ActivityTag";
import { ExpectationTag, IExpectationTag } from "./enums/ExpectationTag";
import { Dayjs } from "dayjs";

export interface ITestAnswer extends Record<ICityType, ( undefined | number )> {
    expectation: {
        selected: IExpectationTag[],
        unSelected: IExpectationTag[]
    },
    activity: {
        selected: IActivityTag[],
        unSelected: IActivityTag[]
    },
    leadership: undefined | number,
    scheduleStartTime: undefined | number,
    scheduleEndTime: undefined | number,
    schedule: undefined | number,
    dailyRestaurantBudget: undefined | number, /* 식사 평균 */
    specialRestaurantBudget: undefined | number, /* 특별한 식사 */
    specialRestaurantCount: undefined | number, /* 특별한 식사 */
    // accomodate: undefined | number, /* 숙소 평균 */
    // accomodateSpecial: undefined | number, /* 특별한 숙소 */
};

export interface ITestAnswerDTO extends Record<ICityType, number>, Record<NumericTestName, number> {
    expectation: IExpectationTag[],
    activity: IActivityTag[],
};

export const defaultTestAnswer: ITestAnswer = {
    expectation: {
        selected: [],
        unSelected: Object.values(ExpectationTag)
    },
    activity: {
        selected: [],
        unSelected: Object.values(ActivityTag)
    },
    leadership: undefined,
    scheduleStartTime: undefined,
    scheduleEndTime: undefined,
    schedule: undefined,
    dailyRestaurantBudget: undefined, /* 식사 평균 */
    specialRestaurantBudget: undefined, /* 특별한 식사 */
    specialRestaurantCount: undefined, /* 특별한 식사 */
    // accomodate: undefined, /* 숙소 평균 */
    // accomodateSpecial: undefined, /* 특별한 숙소 */
    metropolis: undefined,
    history: undefined,
    nature: undefined,
    small: undefined,
};

export const testAnswerToDTO: (testAnswer: ITestAnswer) => ITestAnswerDTO = ( testAnswer ) => (
    {
        ...testAnswer,
        expectation: testAnswer.expectation.selected,
        activity: testAnswer.activity.selected,
    } as ITestAnswerDTO
);

export type ITestName = keyof ITestAnswer;
export type NumericTestName = keyof Omit<ITestAnswer, "activity" | "expectation">;
export const SET_TESTS: string[] = ["activity", "expectation"] as const;
export type SetTestName = keyof Pick<ITestAnswer, "activity" | "expectation">;