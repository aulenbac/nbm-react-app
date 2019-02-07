import React from "react";
import { Button } from "reactstrap";
import { Glyphicon } from "react-bootstrap";

import CustomDialog from "../CustomDialog/CustomDialog";
import WmsLegend from "./WmsLegend"
import ArcgisLegend from "./ArcgisLegend"

import "./Legend.css"

class Legend extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDialogOpen: false,
            enabledLayers: props.enabledLayers
        }
    }

    openDialog = () => this.setState({ isDialogOpen: true });

    handleClose = () => this.setState({ isDialogOpen: false });

    render() {
        const legend = (legend) => {
            if (legend.imageUrl) {
                return <WmsLegend imageUrl={legend.imageUrl}/>
            } else if (legend.arcgisUrl) {
                return <ArcgisLegend layers={legend.layers} jsonUrl={legend.arcgisUrl}/>
            } else {
                return <div></div>
            }
        }
        return (
            <div>
                <Button className='placeholder-button' onClick={this.openDialog} >
                    <Glyphicon className="inner-glyph" glyph="menu-hamburger" />
                </Button>
                {
                    this.state.isDialogOpen &&
                    <CustomDialog
                        isResizable={true}
                        isDraggable={true}
                        title="Legend"
                        modal={false}
                        onClose={this.handleClose}
                        body={
                            this.props.enabledLayers.map(function (layer, idx) {
                                return (
                                    <div className="legend-holder" key={"legend" + idx}>
                                        <span className="layer-title">{layer.title}</span><br></br>
                                        {
                                            layer.legend ? legend(layer.legend) : "No legend info"
                                        }
                                    </div>
                                )
                            })
                        }
                    />
                }
            </div>
        );
    }
}
export default Legend;
