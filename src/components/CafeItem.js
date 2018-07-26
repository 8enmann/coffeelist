import _ from 'lodash';
import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import CafeNeighborhood from './CafeNeighborhood';
import CafeAttributes from './CafeAttributes';
import CafeName from './CafeName';
import iconData from '../data/generalIcons.json';

class CafeItem extends Component {
    constructor () {
        super()

        this.state = {
            cafe: {},
            name: "",
            neighborhood: "",
            expanded: false
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({ cafe: _.clone(newProps.cafe, true), name: newProps.cafe.name, neighborhood: newProps.cafe.neighborhood });
    }

    componentWillMount() {
        this.setState({ cafe: this.props.cafe, name: this.props.cafe.name, neighborhood: this.props.cafe.neighborhood });
    }

    displayHorizontalAttributes() {
        console.log("displayAttr1");
        if (this.props.selected == false) {
            console.log(this.state.cafe.attributes.outlets);
            return <CafeAttributes 
                outlets={this.state.cafe.attributes.outlets}
                coffee={this.state.cafe.attributes.coffee}
                wifi={this.state.cafe.attributes.wifi}
                food={this.state.cafe.attributes.food}
                vertical={false}
            />;
        }
        return <div class='cafe_pad32'></div>;
    }

    displayVerticalAttributes() {
        if (this.props.selected) {
            return <CafeAttributes 
                outlets={this.state.cafe.attributes.outlets}
                coffee={this.state.cafe.attributes.coffee}
                wifi={this.state.cafe.attributes.wifi}
                food={this.state.cafe.attributes.food}
                vertical={true}
            />;
        }
        return;
    }

    displayAddress() {
        if (this.props.selected) {
            return (
                <div class='cafeAddress'>
                    <p class='cafeAddress_text'>
                        {this.state.cafe.address.street} <br />
                        {this.state.cafe.address.citystate} <br />
                        {this.state.cafe.address.zip}
                    </p>
                </div>
            )
        }
    }

    selectionProcess() {
        if (this.props.selected) {
            this.props.clearCafe()
        }
        else {
            this.props.selectCafe(this.state.cafe.name)
        }
    }

    render () {
        console.log("rendering");
        return (
            <div class='cafeRow_container'>
                <div class='cafeRow' onClick={this.selectionProcess.bind(this)}>
                    <div class='cafeNeighborhood_container'>
                        <div class='cafeNeighborhood'>
                            <CafeNeighborhood neighborhood={this.state.neighborhood} sort={this.props.sortFlag} />
                        </div>
                        {this.displayAddress()}
                    </div>
                    <CafeName name={this.state.name}>
                        {this.displayVerticalAttributes()}
                    </CafeName>
                    {this.displayHorizontalAttributes()}
                    <div class='cafeArrow_container'>
                        <div class='cafeArrow'>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const selected = ownProps.cafe.name === state.selectedName;
    const sortFlag = state.sortFlag;
    return { selected, sortFlag };
};



export default connect(mapStateToProps, actions)(CafeItem);
