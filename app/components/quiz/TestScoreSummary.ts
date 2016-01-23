import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ITest} from '../../../common/interfaces/QuizInterfaces';

@Component({
    selector: 'test-score-summary',
    templateUrl: './components/quiz/TestScoreSummary.html',
    styleUrls: ['./components/quiz/TestScoreSummary.css'],
    inputs: ['test'],
    providers: [],
    directives: [CORE_DIRECTIVES]
})
export class TestScoreSummary {

    test:ITest;
}
