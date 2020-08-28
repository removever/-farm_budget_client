import React from "react";
const Loading = (props) => {
    if (props.showLoading) {
        return (
            <>
                <div class="modal fade" tabindex="-1" style={{ display: 'block', opacity: 1, }} >
                    <div style={{ display: 'flex', justifyContent: 'center', position: 'fixed', top: 'calc(50vh - 100px)', left: 'calc(50vw - 100px)' }}>
                        {/* <ReactLoading type={"spokes"} color="#fff" height='200px' width='200px' /> */}
                        <svg id="loading" style={{ width: 200, height: 200, color: '#fff' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <path opacity=".1" d="M14 0 H18 V8 H14 z" transform="rotate(0 16 16)">
                                <animate attributeName="opacity" from="1" to=".1" dur="1s" repeatCount="indefinite" begin="0" />
                            </path>
                            <path opacity=".1" d="M14 0 H18 V8 H14 z" transform="rotate(45 16 16)">
                                <animate attributeName="opacity" from="1" to=".1" dur="1s" repeatCount="indefinite" begin="0.125s" />
                            </path>
                            <path opacity=".1" d="M14 0 H18 V8 H14 z" transform="rotate(90 16 16)">
                                <animate attributeName="opacity" from="1" to=".1" dur="1s" repeatCount="indefinite" begin="0.25s" />
                            </path>
                            <path opacity=".1" d="M14 0 H18 V8 H14 z" transform="rotate(135 16 16)">
                                <animate attributeName="opacity" from="1" to=".1" dur="1s" repeatCount="indefinite" begin="0.375s" />
                            </path>
                            <path opacity=".1" d="M14 0 H18 V8 H14 z" transform="rotate(180 16 16)">
                                <animate attributeName="opacity" from="1" to=".1" dur="1s" repeatCount="indefinite" begin="0.5s" />
                            </path>
                            <path opacity=".1" d="M14 0 H18 V8 H14 z" transform="rotate(225 16 16)">
                                <animate attributeName="opacity" from="1" to=".1" dur="1s" repeatCount="indefinite" begin="0.675s" />
                            </path>
                            <path opacity=".1" d="M14 0 H18 V8 H14 z" transform="rotate(270 16 16)">
                                <animate attributeName="opacity" from="1" to=".1" dur="1s" repeatCount="indefinite" begin="0.75s" />
                            </path>
                            <path opacity=".1" d="M14 0 H18 V8 H14 z" transform="rotate(315 16 16)">
                                <animate attributeName="opacity" from="1" to=".1" dur="1s" repeatCount="indefinite" begin="0.875s" />
                            </path>
                        </svg>
                    </div>
                </div>
                <div class="modal-backdrop fade show"></div>
            </>
        )
    } else {
        return (
            null
        )
    }

};

export default Loading;