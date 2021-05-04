import React from 'react'
import { Text, TouchableOpacity, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import TipManager from './TipManager'

const Tip = (props) => {
    const {
        id,
        children,
        title,
        body,
        titleStyle,
        bodyStyle,
        tipContainerStyle,
        dismissable,
        renderTip,
        overlayOpacity,
        showItemPulseAnimation,
        pulseColor,
        onPressItem,
        onDismiss,
        onTipPress,
        style
    } = props

    const tipId = React.useRef('')

    function showTip(target) {
        TipManager.showTip(tipId.current)
    }

    function getDimensions(evt) {
        const layout = evt.nativeEvent.layout

        const _id = id || String(new Date().getTime())
        tipId.current = _id

        TipManager.registerTip({
            id: _id,
            target: evt.nativeEvent.target,
            layout,
            title,
            body,
            titleStyle,
            bodyStyle,
            tipContainerStyle,
            dismissable,
            children,
            renderTip,
            overlayOpacity,
            showItemPulseAnimation,
            pulseColor,
            onPressItem,
            onDismiss,
            onTipPress
        })
    }

    if (tipId.current) TipManager.updateProps(tipId.current, props)

    return (
        <TouchableOpacity
            onLayout={getDimensions}
            onPress={showTip}
            style={{ ...style, alignSelf: 'baseline' }}
        >
            {children}
        </TouchableOpacity>
    )
}

Tip.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node.isRequired,
    dismissable: PropTypes.bool,
    title: PropTypes.string,
    body: PropTypes.string,
    titleStyle: Text.propTypes.style,
    bodyStyle: Text.propTypes.style,
    tipContainerStyle: ViewPropTypes.style,
    style: ViewPropTypes.style,
    renderTip: PropTypes.func,
    overlayOpacity: PropTypes.number,
    showItemPulseAnimation: PropTypes.bool,
    pulseColor: PropTypes.string,
    onPressItem: PropTypes.func,
    onTipPress: PropTypes.func,
    onDismiss: PropTypes.func
}

export default Tip
