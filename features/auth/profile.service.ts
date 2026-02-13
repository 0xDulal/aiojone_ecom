import { createClient } from '@/lib/supabase/server'

export class ProfileService {
    static async getCurrentProfile() {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return null

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        if (error) {
            console.error('Error fetching profile:', error)
            return null
        }

        return data
    }

    static async updateProfile(id: string, updates: any) {
        const supabase = await createClient()
        const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', id)

        if (error) throw error
    }
}
