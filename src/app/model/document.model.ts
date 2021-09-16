import {TestResult} from './test-result.model';

export interface Document {
  id: number;
  name: string;
  content: string;
  testResult: TestResult;
}
