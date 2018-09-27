
import {Component} from './component';
import {registry} from '../decorators/registry';
import {PjaxService} from '../services/pjax/pjax.service';
import {dependencies} from 'needlepoint';
// import {LogsComponent} from '../components/logs/logs.component';
// import {ReportsComponent} from '../components/reports/reports.component';
// import {RequetsComponent} from '../components/requests/requests.component';


// @registry([
//     ['logs', LogsComponent],
//     ['reports', ReportsComponent],
//     ['requests', RequetsComponent],
// ])
@dependencies(PjaxService)
export class Page extends Component {
    constructor(pjaxService) {
        super();
        this.pjaxService = pjaxService;
    }

    onSuccessPjax(data) {
        this.stop(() => {
            $(this.instance).html(data.contents);
            this.initComponents();
            console.log(this)
        });

    }

    onBind(domListen, parentListen) {
        parentListen("url/change", (event) => {
            this.pjaxService.getHTML(event.data[0].path, (data) => {
                this.onSuccessPjax(data);
            });
        });
        parentListen("started", () => {
            this.initComponents();
        });
    }
}
