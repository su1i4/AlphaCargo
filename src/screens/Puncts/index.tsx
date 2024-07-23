import { View, StyleSheet, Text } from "react-native"
import { useGetOfficesQuery } from "../../services/base.service"

export const Puncts = () => {
    const {data = []} = useGetOfficesQuery()
    return (
        <View>

        </View>
    )
}


const styles = StyleSheet.create({
    wrap: {
        
    }
})