import { createContext, useEffect, useState } from "react"
import { databases, client, ID, Query, Permission, Role } from "../lib/appwrite"
import { useUser } from "../hooks/useUser"



export const CaseContext = createContext()

export function CaseProvider({children}) {
  const [cases, setCases] = useState([])
  const {  user } = useUser()

  async function fetchCases() {
    try {
      const response = await databases.listDocuments(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID,
        [
            Query.equal('userId', user.$id)
        ]
      )

      setCases(response.documents)
      console.log(response.documents)

    } catch (error) {
      console.error(error.message)
    }
  }

  async function fetchCaseById(id) {
    try {

  
      return response 
    } catch (error) {
      console.log(error.message)
    }
  }

  async function createCase(data) {
    try {
      const newCase = await databases.createDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID,
        ID.unique(),
        {...data, userId: user.$id},
        [
            Permission.read(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
        ]
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  async function deleteCase(id) {
    try {
      
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {

    let unsubscribe
    const channel = `databases.${process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID}.collections.${process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID}.documents`

    if (user) {
        fetchCases()

        unsubscribe = client.subscribe(channel, (response) => { 
            const { payload, events } = response

            if (events[0].includes('create')) {
                setCases((prevCases) => [...prevCases, payload])
            }

        })
    } else {
        setCases([])
    }

    return () => {
        if (unsubscribe) unsubscribe()
    }

  }, [user])

  return (
    <CaseContext.Provider 
      value={{ cases, fetchCases, fetchCasesById, createCase, deleteCase }}
    >
      {children}
    </CaseContext.Provider>
  )
}