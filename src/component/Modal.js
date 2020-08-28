import React, { Component } from "react";

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    outClick() {
        console.log("out Click");
    }
    render() {
        console.log("md_props>", this.props);
        if (this.props.showModal) {
            return (
                <>
                    <div class="modal fade" tabindex="-1" style={{ display: 'block', opacity: 1, }} >
                        <div>
                            {this.props.children}

                        </div>
                    </div>
                    <div class="modal-backdrop fade show" onClick={this.outClick.bind(this)}></div>
                </>
            )
        } else {
            return null
        }

    }
}
export default (Modal);