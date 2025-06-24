import React, { Component } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default class brandDetails extends Component {
  render() {
    return (
    <SafeAreaView
        className="flex-1 bg-app-background items-center"
        edges={['top', 'bottom']}
        >
        <Text>brandDetails</Text>
      </SafeAreaView>
    )
  }
}