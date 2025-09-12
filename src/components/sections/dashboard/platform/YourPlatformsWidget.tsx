'use client';

interface Platform {
  id: string;
  name: string;
}

interface YourPlatformsWidgetProps {
  platforms?: Platform[];
}

export default function YourPlatformsWidget({
  platforms = [],
}: YourPlatformsWidgetProps) {
  const handleManageClick = (platformId: string, e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Manage platform with ID:', platformId);
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="flex items-center justify-between px-4 py-5 sm:px-6">
        <h3 className="text-lg font-semibold leading-6 text-gray-900">
          Your Platforms
        </h3>
      </div>

      <div className="border-t border-gray-200">
        {platforms.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-sm text-gray-500">
              No platforms created yet. Create your first platform to get
              started.
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Platform
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {platforms.map((platform) => (
                <tr
                  key={platform.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {platform.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={(e) => handleManageClick(platform.id, e)}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors focus:outline-none focus:underline"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
