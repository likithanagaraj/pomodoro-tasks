import { getPomodoroSessions } from '@/storage/pomodoro_storage'
import { PomodoroSession } from '@/types/pomodoro'
import { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  const [session, setsession] = useState<PomodoroSession[]>([])
  useEffect(() => {
    const loadSession = async()=>{
      const data = await getPomodoroSessions()
      console.log(data)
      setsession(data)
    }
    loadSession()
  }, [])
  
  
  return (
   <SafeAreaView className="flex-1 py-2 bg-[#F8F8F8] px-5">

    {
      session.map((e)=>(
        <Text key={e.id}>{e.mode}</Text>
      ))
    }

      
    </SafeAreaView>
  )
}

export default index