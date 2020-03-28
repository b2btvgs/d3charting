import React, {
    Component
} from 'react'
import D3Chart from './D3Charts/D3BarChart';
import D3SunburstChart from './D3Charts/D3SunburstChart';

export default class ChartWrapper extends Component {

    constructor(props) {
        super(props);
        this.chart = React.createRef();
    }

    componentDidMount() {

        // new D3Chart(this.chart.current)
        new D3SunburstChart(this.chart.current)
    }

    render() {
        return (<div ref={this.chart}></div>
        )
    }
}