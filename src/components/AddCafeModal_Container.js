import _ from 'lodash';
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import '../App.css';
import listData from '../data/sfData.json'
import CafeItem from './CafeItem';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import AddCafeModal from './AddCafeModal';


class AddCafeModal_Container extends Component {
    constructor () {
        super();

        this.state = {
            open: false
        }
    }

    componentWillReceiveProps(newProps) {
    }

    componentWillMount() {
        this.props.closeModal();
    }

    onOpenModal = () => {
        this.props.openModal();
    };
    
    onCloseModal = () => {
        this.props.closeModal();
    };

    render () {
        return (
            <Modal 
                open={this.props.modalOpen} 
                onClose={this.onCloseModal} 
                center
                classNames={{ overlay: 'modal_custom_overlay', modal: 'modal_custom' }}
            >
                <AddCafeModal />
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    const modalOpen = state.modalOpen.open;

    return { modalOpen };
};

export default connect(mapStateToProps, actions)(AddCafeModal_Container);
