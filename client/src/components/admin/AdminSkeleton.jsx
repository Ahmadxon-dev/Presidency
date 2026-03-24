import React from 'react'

const AdminSkeleton = () => {
  return (
                <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    {/* Header Section */}
                    <div className="w-full flex items-center justify-between mx-auto mb-8">
                        <div className="h-10 w-48 bg-slate-200 rounded-lg animate-pulse" />
                        <div className="h-10 w-24 bg-slate-200 rounded-lg animate-pulse" />
                    </div>

                    {/* Table Section */}
                    <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">F.I.SH</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Login</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Amallar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(5)].map((_, idx) => (
                                        <tr key={idx} className="border-b border-slate-200">
                                            {/* Name Column */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {/* <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" /> */}
                                                    <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                                                </div>
                                            </td>

                                            {/* Login Column */}
                                            <td className="px-6 py-4">
                                                <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                                            </td>

                                            {/* Actions Column */}
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-3">
                                                    <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse" />
                                                    <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default AdminSkeleton