import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      className="flex-1 bg-white flex-row justify-center"
    >
      <Text className="text-xl">Edit app/index.tsx to edit this screen.</Text>
    </SafeAreaView>
  );
}
