import React from 'react'

const UserProfileSkeleton = () => {
  return (
        <div className="w-full max-w-2xl flex justify-center mx-auto items-center ">
      {/* Main Card */}
      <div className="bg-card w-full border border-border rounded-2xl overflow-hidden shadow-xl">
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/10 animate-pulse" />

        {/* Content */}
        <div className="px-8 pb-8">
          {/* Avatar and Name */}
          <div className="flex flex-col items-center -mt-16 mb-8 relative z-10">
            <div className="w-32 h-32 rounded-full bg-muted animate-pulse border-4 border-card mb-6" />
            <div className="h-10 w-48 bg-muted rounded-lg animate-pulse mb-4" />
            <div className="h-6 w-32 bg-muted rounded-lg animate-pulse" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-6 border border-primary/40">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse mb-2" />
                  <div className="h-8 w-32 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-6 border border-primary/40">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse mb-2" />
                  <div className="h-8 w-32 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-6 border border-primary/40">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse mb-2" />
                  <div className="h-8 w-32 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-6 border border-primary/40">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse mb-2" />
                  <div className="h-8 w-32 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>

          </div>

          {/* <div className="flex w-full"> */}
            {/* <div className="h-12 bg-primary/20 rounded-xl animate-pulse" /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default UserProfileSkeleton  