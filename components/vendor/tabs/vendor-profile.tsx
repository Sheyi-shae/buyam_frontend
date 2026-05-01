"use client"

import type React from "react"

import { Edit2, Trash2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function VendorProfile({ vendor }: { vendor: any }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    storeName: vendor.name,
    email: "store@premium-electronics.com",
    phone: "+1 (555) 123-4567",
    address: "123 Electronics Ave, New York, NY 10001",
    description: vendor.description,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // API call would go here
  }

  return (
    <div className="max-w-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Section */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Store Information</h3>
              <Button
                variant={isEditing ? "default" : "outline"}
                size="sm"
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="gap-2"
              >
                <Edit2 className="w-4 h-4" />
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Store Name</label>
                <Input
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-card border-border"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="bg-card border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="bg-card border-border"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Address</label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-card border-border"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Store Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Seller Settings</h3>
            <div className="space-y-3">
              <div className="p-4 border border-border rounded-lg flex items-center justify-between hover:bg-muted/50 transition">
                <div>
                  <p className="font-semibold text-foreground">Payment Methods</p>
                  <p className="text-sm text-muted-foreground">Manage your payment information</p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>

              <div className="p-4 border border-border rounded-lg flex items-center justify-between hover:bg-muted/50 transition">
                <div>
                  <p className="font-semibold text-foreground">Shipping Preferences</p>
                  <p className="text-sm text-muted-foreground">Set default shipping options</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>

              <div className="p-4 border border-border rounded-lg flex items-center justify-between hover:bg-muted/50 transition">
                <div>
                  <p className="font-semibold text-foreground">Auto-Reply Messages</p>
                  <p className="text-sm text-muted-foreground">Set up automatic responses</p>
                </div>
                <Button variant="outline" size="sm">
                  Set Up
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="lg:col-span-2 lg:col-start-1">
          <div className="border-2 border-destructive/30 bg-destructive/5 rounded-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-destructive mb-1">Danger Zone</h4>
                <p className="text-sm text-muted-foreground">Irreversible actions</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full gap-2 border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
              >
                <Trash2 className="w-4 h-4" />
                Close Store Temporarily
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2 border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Deleting your account is permanent and cannot be undone. All your listings and reviews will be removed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
