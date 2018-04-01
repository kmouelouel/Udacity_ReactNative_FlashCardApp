import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white } from '../utils/colors'
import {capitalize } from '../utils/helpers'

export default function TextButton({ children, onPress, style = {} }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.reset, style]}>{capitalize(children)}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    reset: {
        textAlign: 'center',
        color: white,
        padding: 5,
        fontSize: 16,

    }
})
