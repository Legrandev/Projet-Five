"use client";

import { Save, Copy, X } from "lucide-react";
import { createPortal } from "react-dom";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    type: "save" | "apply";
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    type,
}: ConfirmModalProps) {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    if (!isOpen) return null;
    if (typeof window === 'undefined') return null;

    const modalContent = (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                zIndex: 999999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #1A1A1A, #0F0F0F)',
                    borderRadius: '32px',
                    border: '1px solid #333',
                    maxWidth: '28rem',
                    width: '100%',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
                    overflow: 'hidden',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(to bottom right, #222, #181818)',
                    padding: '2rem 1.5rem',
                    borderBottom: '1px solid #333',
                    position: 'relative',
                    borderTopLeftRadius: '32px',
                    borderTopRightRadius: '32px',
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            padding: '0.5rem',
                            borderRadius: '9999px',
                            background: 'transparent',
                            border: 'none',
                            color: '#9CA3AF',
                            cursor: 'pointer',
                        }}
                    >
                        <X size={18} />
                    </button>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '1rem',
                            borderRadius: '1rem',
                            background: type === "save" ? 'rgba(30, 215, 96, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                            border: type === "save" ? '1px solid rgba(30, 215, 96, 0.3)' : '1px solid rgba(255, 255, 255, 0.3)',
                        }}>
                            {type === "save" ? (
                                <Save size={32} color="#1ED760" />
                            ) : (
                                <Copy size={32} color="white" />
                            )}
                        </div>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: 'white',
                            textAlign: 'center',
                        }}>
                            {title}
                        </h2>
                    </div>
                </div>

                {/* Message */}
                <div style={{ padding: '1.5rem' }}>
                    <p style={{
                        color: '#D1D5DB',
                        textAlign: 'center',
                        fontSize: '1rem',
                        lineHeight: '1.75',
                    }}>
                        {message}
                    </p>
                </div>

                {/* Actions */}
                <div style={{ padding: '0 1.5rem 1.5rem', display: 'flex', gap: '0.75rem' }}>
                    <button
                        onClick={onClose}
                        style={{
                            flex: 1,
                            padding: '0.875rem 1.5rem',
                            borderRadius: '0.75rem',
                            fontWeight: 'bold',
                            fontSize: '0.875rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            background: '#222',
                            color: 'white',
                            border: '1px solid #333',
                            cursor: 'pointer',
                        }}
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleConfirm}
                        style={{
                            flex: 1,
                            padding: '0.875rem 1.5rem',
                            borderRadius: '0.75rem',
                            fontWeight: 'bold',
                            fontSize: '0.875rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            background: type === "save"
                                ? 'linear-gradient(to right, #1ED760, #17B54D)'
                                : 'linear-gradient(to right, white, #E5E7EB)',
                            color: 'black',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                        }}
                    >
                        Confirmer
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
