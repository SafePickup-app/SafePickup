import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from "react-native";

type Column = {
    key: string;
    title: string;
    flex?: number;
    render?: (item: any) => React.ReactNode;
};

type Props = {
    title: string;
    columns: Column[];
    data: any[];
};

export default function Table({ title, columns, data }: Props) {

    const renderItem = ({ item, index }: any) => {

        const rowTint = index % 2 === 0 ? styles.rowEven : null;

        return (
            <View style={[styles.row, rowTint]}>

                {columns.map((col) => (
                    <View
                        key={col.key}
                        style={[styles.cell, { flex: col.flex || 1 }]}
                    >
                        {col.render ? (
                            col.render(item)
                        ) : (
                            <Text
                                style={styles.nameText}
                                numberOfLines={2}
                            >
                                {item[col.key]}
                            </Text>
                        )}
                    </View>
                ))}

            </View>
        );
    };

    return (
        <View style={styles.card}>

            <Text style={styles.title}>{title}</Text>

            <View style={styles.headerRow}>
                {columns.map((col) => (
                    <View
                        key={col.key}
                        style={[styles.headerCell, { flex: col.flex || 1 }]}
                    >
                        <Text
                            style={styles.headerText}
                            numberOfLines={2}
                        >
                            {col.title}
                        </Text>
                    </View>
                ))}
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        width: "92%",
        borderRadius: 22,
        padding: 22,
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#222",
        marginBottom: 20,
    },

    headerRow: {
        flexDirection: "row",
        paddingBottom: 10,
    },

    headerCell: {
        paddingHorizontal: 8,
        justifyContent: "center",
        alignItems: "center",
    },

    headerText: {
        fontSize: 12,
        color: "#777",
        textTransform: "uppercase",
        fontWeight: "600",
        flexShrink: 1,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",


    },

    rowEven: {
        backgroundColor: "#fafafa",
    },

    cell: {
        paddingHorizontal: 8,
        justifyContent: "center",
        alignItems: "center",
    },

    nameText: {
        fontSize: 14,
        color: "#222",
        flexShrink: 1,
    },
    name: {
        flex: 2,
        fontSize: 16,
    }, grade: {
        flex: 1,
        textAlign: "center",
        fontSize: 16,
    }, action: {
        flex: 1,
        alignItems: "center",
    },

});