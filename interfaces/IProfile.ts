import { ITestAnswer, ITestAnswerDTO, defaultTestAnswer } from "./ITestAnswer";
import { ITestResult, defaultTestResult } from "./ITestResult";

export interface IProfile {
    id: string;
    nickname: string;
    discriminator: string;
    testAnswer: ITestAnswerDTO;
    testResult: ITestResult;
};

export const defaultProfile = {
    id: "",
    nickname: "",
    discriminator: "",
    testAnswer: defaultTestAnswer,
    testResult: defaultTestResult,
};

export type IProfileId = string;