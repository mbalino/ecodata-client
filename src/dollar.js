import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Ellipsis } from "react-awesome-spinners";
import {ButtonGroup} from "react-bootstrap";
import Footer from "./components/Footer";
import Table from "react-bootstrap/Table";
import {uniqueId} from "recharts/lib/util/DataUtils";
import { Chart } from 'react-google-charts';

export default class Dollar extends React.Component {

    constructor(props) {
        super(props);
        this.lessSamples = this.lessSamples.bind(this);
        this.moreSamples = this.moreSamples.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    state = {
            fakeControls: [],
            results: [],
            sample: [],
            graph: [],
            done: undefined,
            sampleCount: 1,
            graphWidth: 1
        }

    lessSamples() {
        this.setState( {sampleCount:
                this.state.sampleCount + 10 > this.state.results.length ?
                    this.state.results.length :
                    this.state.sampleCount + 10});
        this.reSample()
    }

    moreSamples() {
        this.setState( {sampleCount:
                this.state.sampleCount - 10 > 0 ?
                    this.state.sampleCount - 10 :
                    1});
        this.reSample();
    }

    reSample() {
        this.setState({sample:
            this.state.results.filter(r => r.id % this.state.sampleCount === 0)
        });

        const quotes_graph = [["Date", "Price"]];

        this.state.sample.forEach((result) => (
            quotes_graph.push([result.fecha, parseFloat(result.ars) ])));

        this.setState( {
            graph: quotes_graph
        })


    }

    handleResize() {
        this.setState({
            graphWidth: window.innerWidth,
            fakeControls: []
        });
    }

    componentDidMount() {
        this.handleResize();

        window.addEventListener('resize', this.handleResize);

        let instance = axios.create({
            baseURL: 'http://localhost:5000',
            timeout: 2000,
            responseType: "json"
        });

        instance.get('/api/get-all-quotes/?password=dev')
            .then(res => {
                const quotes = res.data.map((result, id) => (
                    { id: id, fecha: result.d, ars: result.v }
                ));

                const quotes_graph = [["Date", "Price"]];

                res.data.forEach((result) => (
                    quotes_graph.push([result.d, result.v ])));

                this.setState({
                                        results: quotes,
                                        sample: quotes,
                                        graph: quotes_graph,
                                        done: true});
            }).catch( error => {
                console.error(error);
            }
        )
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }


    render() {

        return (
            <>
            {!this.state.done ? (
                <Ellipsis />
                ):
                    (
                        <>
                        <div>
                            <div>
                                <h3>Cotizaciones ({ this.state.results.length }) Escala de muestra: {this.state.sampleCount}</h3>
                                <h4>{this.state.graphWidth}</h4>
                                <Button variant={"secondary"} href={"/"}>Back</Button>
                                <ButtonGroup>
                                    <Button variant={"secondary"} href={"#"} onClick={this.lessSamples}>+</Button>
                                    <Button variant={"secondary"} href={"#"} onClick={this.moreSamples}>-</Button>
                                </ButtonGroup>
                                <br/>
                            </div>
                            <div>
                                <Chart
                                    controls = { this.state.fakeControls }
                                    width={this.state.graphWidth.toString() + 'px'}
                                    height={'300px'}
                                    chartType={"LineChart"}
                                    loader={<div>Loading Chart</div>}
                                    data={ this.state.graph }
                                    getChartWrapper={chartWrapper => {
                                        chartWrapper.draw();
                                    }}
                                    options={{
                                        hAxis: {
                                            title: 'Price',
                                        },
                                        vAxis: {
                                            title: 'Date',
                                        }
                                    }}
                                    rootProps={{ 'data-testid': '1' }}
                                />
                            </div>
                            <Table striped bordered hover>
                                <thead  className="thead-dark">
                                <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Valor</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.sample.map((result) => (
                                    <tr key={uniqueId()}>
                                        <td key={uniqueId()}>{result.fecha}</td>
                                        <td key={uniqueId()}>{result.ars}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <Footer />
                        </div>
                        </>
                    )}
    </>
        );
    }
}
