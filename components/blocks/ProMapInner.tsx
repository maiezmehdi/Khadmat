'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { ProProfile } from '@/types';
import 'leaflet/dist/leaflet.css';

const TUNIS_CENTER: [number, number] = [36.8300, 10.1900];

function createAvatarIcon(pro: ProProfile) {
  const name = pro.user?.full_name ?? '';
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const isPremium = pro.subscription === 'premium';
  const borderColor = isPremium ? '#F5A623' : '#1A1614';
  const avatarUrl = pro.user?.avatar_url ?? '';

  return L.divIcon({
    className: '',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;width:48px;">
        <div style="
          width:46px;height:46px;border-radius:50%;
          border:3px solid ${borderColor};background:white;
          overflow:hidden;box-shadow:0 4px 14px rgba(0,0,0,0.22);
          display:flex;align-items:center;justify-content:center;flex-shrink:0;
        ">
          ${avatarUrl
            ? `<img src="${avatarUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'" />`
            : `<span style="font-size:14px;font-weight:700;color:#1A1614;font-family:sans-serif">${initials}</span>`
          }
        </div>
        <div style="
          width:0;height:0;
          border-left:6px solid transparent;
          border-right:6px solid transparent;
          border-top:8px solid ${borderColor};
          margin-top:-1px;
        "></div>
      </div>
    `,
    iconSize: [48, 56],
    iconAnchor: [24, 56],
    popupAnchor: [0, -58],
  });
}

export default function ProMapInner({
  pros,
  lang,
  onProClick,
}: {
  pros: ProProfile[];
  lang: string;
  onProClick?: (pro: ProProfile) => void;
}) {
  const prosWithCoords = pros.filter(p => p.lat && p.lng);

  return (
    <MapContainer
      center={TUNIS_CENTER}
      zoom={12}
      style={{ height: '100%', width: '100%', borderRadius: '20px' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {prosWithCoords.map(pro => {
        const service = pro.services?.[0];
        return (
          <Marker
            key={pro.id}
            position={[pro.lat!, pro.lng!]}
            icon={createAvatarIcon(pro)}
          >
            <Popup maxWidth={200} className="khadamat-popup">
              <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  {pro.user?.avatar_url && (
                    <img
                      src={pro.user.avatar_url}
                      alt={pro.user.full_name}
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                    />
                  )}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#1A1614', lineHeight: 1.2 }}>
                      {pro.user?.full_name}
                      {pro.is_approved && <span style={{ color: '#27AE60', marginLeft: '4px', fontSize: '12px' }}>✓</span>}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9C9189', marginTop: '2px' }}>
                      {pro.user?.city} · ★ {pro.rating_avg.toFixed(1)}
                    </div>
                  </div>
                </div>
                {service && (
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#F5A623', marginBottom: '10px' }}>
                    {lang === 'dr' ? 'من' : 'Dès'} {service.price_from} DT
                    <span style={{ fontWeight: 400, color: '#9C9189', fontSize: '11px' }}>
                      {service.price_unit === 'heure' ? (lang === 'dr' ? '/س' : '/h') : ''}
                    </span>
                  </div>
                )}
                <a
                  href={`/pro/${pro.id}`}
                  style={{
                    display: 'block', width: '100%', padding: '8px 12px',
                    background: '#F5A623', color: '#1A1614', borderRadius: '10px',
                    textAlign: 'center', fontSize: '13px', fontWeight: 700,
                    textDecoration: 'none', boxSizing: 'border-box',
                  }}
                >
                  {lang === 'dr' ? 'شوف الملف' : 'Voir le profil'}
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
