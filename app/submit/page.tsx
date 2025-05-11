import CommunityForm from "@/components/community/CommunityForm"

export default function Submit() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Submit Your Community</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Share your MultiversX community with our growing audience. Fill out the form below with your community
          details, and we'll review your submission shortly.
        </p>
      </div>

      <CommunityForm />
    </div>
  )
}
