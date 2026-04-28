"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export interface Profile {
  wallet_address: string;
  username: string | null;
  bio: string | null;
  skills: string[] | null;
  social_links: {
    github?: string;
    twitter?: string;
    discord?: string;
    website?: string;
  } | null;
  is_looking_for_team: boolean;
  role: 'member' | 'builder' | 'organizer' | 'admin';
  avatar_url: string | null;
  created_at?: string;
}

export function useAuth() {
  const { publicKey, connected } = useWallet();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!connected || !publicKey) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const { supabase } = await import("@/lib/supabase");
        const walletAddress = publicKey.toBase58();

        // Check if profile exists
        let { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("wallet_address", walletAddress)
          .single();

        if (error && error.code === "PGRST116") {
          // Profile doesn't exist, user needs to register
          setProfile(null);
        } else if (!error) {
          setProfile(data);
        }
      } catch (err) {
        console.error("Auth Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [connected, publicKey]);

  return { profile, loading, connected, publicKey };
}
