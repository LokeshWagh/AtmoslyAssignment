import React, { useEffect, useState } from 'react';

function Modal({ launch, onClose }) {
  const [rocketInfo, setRocketInfo] = useState(null);

  useEffect(() => {
    if (launch?.rocket) {
      fetch(`https://api.spacexdata.com/v4/rockets/${launch.rocket}`)
        .then(res => res.json())
        .then(data => setRocketInfo(data))
        .catch(() => setRocketInfo(null));
    }
  }, [launch]);

  if (!launch) return null;

  const launchDate = new Date(launch.date_utc);
  const youtubeUrl = launch.links?.youtube_id
    ? `https://www.youtube.com/embed/${launch.links.youtube_id}`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm"
      style={{ overflowY: 'auto', minHeight: '100vh' }}
    >
      <div
        className="bg-white shadow-2xl rounded-xl w-full max-w-3xl md:max-w-5xl relative flex flex-col md:flex-row gap-6 p-6 md:p-10 my-8"
        style={{
          minHeight: 'fit-content',
          marginLeft: '1rem', marginRight: '1rem',
        }}
      >
        {/* Top-right Close Button */}
        <button
          className="absolute right-6 top-6 px-3 py-2 bg-gray-300 rounded-full hover:bg-gray-400 text-lg"
          onClick={onClose}
        >
          &#x2715;
        </button>

        {/* Video always left (top on mobile) */}
        {youtubeUrl && (
          <div className="w-full md:w-[400px] flex-shrink-0 flex flex-col items-center mt-12 md:mt-0">
            <iframe
              width="100%"
              height="220"
              src={youtubeUrl}
              title={launch.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        )}

        {/* Article */}
        <article className="flex flex-col justify-start text-gray-900 text-base flex-1 min-w-0 mt-6 md:mt-0">
          <h2 className="text-3xl font-bold mb-2">{launch.name}</h2>
          <p className="mb-2 text-gray-700 text-lg">
            {launchDate.toLocaleDateString()} {launchDate.toLocaleTimeString()}
          </p>
          <div className="mb-4 break-words">
            <b>Rocket:</b> {rocketInfo ? rocketInfo.name : launch.rocket}<br />
            <b>Type:</b> {rocketInfo ? rocketInfo.type : 'N/A'}<br />
            <b>Active:</b> {rocketInfo ? (rocketInfo.active ? 'Yes' : 'No') : 'N/A'}<br />
            <b>Flight Number:</b> {launch.flight_number}<br />
            <b>Launchpad:</b> {launch.launchpad || "N/A"}<br />
            <b>Details:</b> {launch.details || 'No details available.'}
          </div>
          <div className="mb-4">
            <b>Failures:</b>{" "}
            {launch.failures && launch.failures.length > 0
              ? launch.failures.map((fail, idx) => (
                  <span key={idx} className="text-red-500">
                    {fail.reason} (at {fail.time}s){' '}
                  </span>
                ))
              : <span>None</span>
            }
          </div>
          <a
            href={launch.links?.wikipedia || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-fit px-5 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-800 transition mt-2 text-lg no-underline"
          >
            Read more on Wikipedia
          </a>
        </article>
      </div>
      {/* Only for responsiveness */}
      <style>{`
        @media (max-width: 600px) {
          .max-w-3xl, .md\\:max-w-5xl { max-width: 94vw !important; }
          .p-6, .md\\:p-10 { padding: 1rem !important; }
          .mt-12 { margin-top: 0.5rem !important; }
        }
      `}</style>
    </div>
  );
}

export default Modal;
