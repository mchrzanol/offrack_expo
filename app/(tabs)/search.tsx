import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  return (
    <SafeAreaView
      className="flex-1 bg-app-background px-5"
      edges={['top']}
    >
        <Text className="text-3xl font-semibold mb-2 mt-10">Search</Text>
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
          <InputField placeholder="Szukaj" className="text-[#b6b6b6]" />
        </Input>
        <ScrollView className="flex-1 w-full h-full flex-col mt-4" showsVerticalScrollIndicator={false}>
        <Text className="text-app-secondary text-2xl font-medium mb-3">Kategorie</Text>
        {Array.from({ length: 10 }).map((_, index) => (
            <View
                key={index}
                className="w-full h-12 rounded-lg justify-center relative border-b border-app-secondary"
            >
                <Text className="text-black text-lg ml-1">Kategoria {index + 1}</Text>
                <Ionicons name="chevron-forward-outline" size={24} color="#b6b6b6" className="absolute right-4" />
            </View>
        ))}
        </ScrollView>
    </SafeAreaView>
  );
}
