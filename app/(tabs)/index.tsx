import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      className="flex-1 bg-app-background items-center"
      edges={['top']}
    >
        <Text className="text-3xl font-bold mb-2">OffRack</Text>
      <ScrollView className="flex-1 w-full h-full flex-col px-5 " showsVerticalScrollIndicator={false}>
        <Input
          variant="outline"
          size="md"
          className="bg-app-primary border-0 mt-3"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputSlot>
              <Ionicons name="search-outline" className="ml-2" size={20} color="#b6b6b6" />
          </InputSlot>
          <InputField placeholder="Czego szukasz?" className="text-[#b6b6b6]" />
        </Input>
        <View className="w-full h-60 bg-app-primary rounded-lg mt-5 justify-center items-center">
          <Text className="text-[#b6b6b6] text-lg">Tutaj będą promocje dnia/wyprzedaże</Text>
        </View>
        <View className="w-full h-auto mt-10 flex-col">
          <View className="flex-row w-full items-center">
            <Ionicons name="heart" size={28} color="app-secondary"/>
            <Text className="text-app-secondary text-2xl font-medium ml-2">Trendujące teraz</Text>
          </View>
          <ScrollView className="w-full mt-3 h-auto" horizontal showsHorizontalScrollIndicator={false}>
              {Array.from({ length: 10 }).map((_, index) => (
                <View
                  key={index}
                  className="w-64 h-auto bg-transparent m-1"
                >
                  <View
                    key={index}
                    className="w-64 h-96 bg-app-card rounded-lg justify-center items-center relative"
                  >
                    <Ionicons name="heart-outline" size={28} color="#b6b6b6" className="absolute top-4 right-4" />
                    <Text className="text-black text-lg">Produkt {index + 1}</Text>
                  </View>
                  <Text className="text-app-secondary text-lg mt-3 font-semibold">Enrage</Text>
                  <Text className="text-app-secondary text-base">Biała koszula</Text>
                  <Text className="text-app-secondary text-lg mt-1">{Math.floor(Math.random() * 100) + 1} zł</Text>
                </View>
              ))}
          </ScrollView>
        </View>

        <View className="w-full h-auto mt-10 flex-col">
          <View className="flex-row w-full mb-3 items-center">
            <Ionicons name="compass" size={28} color="app-secondary"/>
            <Text className="text-app-secondary text-2xl font-medium ml-3">Nowe Kolekcje</Text>
          </View>
              {Array.from({ length: 10 }).map((_, index) => (
                <View
                  key={index}
                  className="w-full h-44 bg-app-card rounded-lg justify-center items-center relative m-1"
                >
                  <Text className="text-black text-lg">Kolekcja {index + 1}</Text>
                </View>
              ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
