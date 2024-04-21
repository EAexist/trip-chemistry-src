import { ActivityTag, IActivityTag } from "./enums/ActivityTag";
import { ExpectationTag, IExpectationTag } from "./enums/ExpectationTag";

export interface ITestAnswer {
    expectation: {
        selected: IExpectationTag[],
        unSelected: IExpectationTag[]
    },
    activity: {
        selected: IActivityTag[],
        unSelected: IActivityTag[]
    },
    leadership: undefined | number,
    schedule: undefined | number,
    food: undefined | number, /* 식사 평균 */
    // foodSpecial: undefined | number, /* 특별한 식사 */
    // accomodate: undefined | number, /* 숙소 평균 */
    // accomodateSpecial: undefined | number, /* 특별한 숙소 */

    metropolis: undefined | number,
    history: undefined | number,
    nature: undefined | number,
};

export interface ITestAnswerDTO {
    expectation: IExpectationTag[],
    activity: IActivityTag[],
    leadership: number,
    schedule: number,
    food: number,
    metropolis: number,
    history: number,
    nature: number,
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
    schedule: undefined,
    food: undefined, /* 식사 평균 */
    // foodSpecial: undefined, /* 특별한 식사 */
    // accomodate: undefined, /* 숙소 평균 */
    // accomodateSpecial: undefined, /* 특별한 숙소 */

    metropolis: undefined,
    history: undefined,
    nature: undefined,
};

export const testAnswerToDTO: (testAnswer: ITestAnswer) => ITestAnswerDTO = ( testAnswer ) => (
    {
        ...testAnswer,
        expectation: testAnswer.expectation.selected,
        activity: testAnswer.activity.selected,
    } as ITestAnswerDTO
);

export type ITestName = keyof ITestAnswer;