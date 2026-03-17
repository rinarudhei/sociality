import { X } from 'lucide-react';
import { toast } from 'sonner';

export const ShowSuccessToast = (message: string) => {
  toast.custom(
    (t) => (
      <div
        style={{
          background: '#079455',
          color: 'white',
          border: 'none',
          fontSize: '14px',
          lineHeight: '28px',
          letterSpacing: '-0.02rem',
          fontWeight: 600,
          padding: '8px 16px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          marginTop: '86px',
          justifyContent: 'space-between',
          gap: '24px',
          boxShadow:
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <span>{message}</span>
        <button
          onClick={() => toast.dismiss(t)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '9999px',
            width: '24px',
            height: '24px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <X size={16} />
        </button>
      </div>
    ),
    {
      position: 'top-right',
      duration: 4000,
    }
  );
};
