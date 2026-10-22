import React, { useState, useEffect, useCallback } from 'react'
import { X, Send, Check, Mail, Building2, User, FileText, AlertCircle, ArrowUpRight, Loader2, ShieldCheck } from 'lucide-react'

/**
 * ReferenceRequestModal
 * 
 * Interactive brutalist-styled modal for requesting professional references.
 * When submitted, sends the inquiry directly to ombiswasatwork@gmail.com
 * via FormSubmit with full mailto fallback.
 */
export default function ReferenceRequestModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    reason: '',
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleClose = useCallback(() => {
    onClose()
    // Reset state slightly after close transition
    setTimeout(() => {
      setStatus('idle')
      setErrorMessage('')
    }, 300)
  }, [onClose])

  // Escape key & body scroll lock
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, handleClose])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const buildMailtoUrl = () => {
    const subject = encodeURIComponent(`Reference Request from ${formData.name || 'Visitor'} (${formData.organization || 'Inquiry'})`)
    const body = encodeURIComponent(
      `Hi Om,\n\nI would like to request professional references for your portfolio.\n\n` +
      `• Name: ${formData.name || ''}\n` +
      `• Email: ${formData.email || ''}\n` +
      `• Organization / Company: ${formData.organization || ''}\n` +
      `• Role / Title: ${formData.role || 'N/A'}\n\n` +
      `• Purpose / Reason for Reference:\n${formData.reason || ''}\n\n` +
      `Sent via omisbrain.vercel.app reference request modal.`
    )
    return `mailto:ombiswasatwork@gmail.com?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate
    if (!formData.name.trim() || !formData.email.trim() || !formData.reason.trim()) {
      setErrorMessage('Please fill in your name, email, and reason.')
      setStatus('error')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('https://formsubmit.co/ajax/ombiswasatwork@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          organization: formData.organization.trim() || 'Individual / Client',
          role: formData.role.trim() || 'Not specified',
          reason: formData.reason.trim(),
          _subject: `Portfolio Reference Request from ${formData.name.trim()} (${formData.organization.trim() || 'Inquiry'})`,
          _replyto: formData.email.trim(),
          _template: 'table',
        }),
      })

      if (response.ok) {
        setStatus('success')
      } else {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || 'Submission failed. Please use the email client fallback.')
      }
    } catch (err) {
      console.warn('FormSubmit network error, falling back:', err)
      setStatus('error')
      setErrorMessage(
        'Unable to send automatically via the server. You can dispatch your request directly through your email client.'
      )
    }
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Request Professional References"
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#fefefe] border-2 sm:border-[2.5px] border-black text-black shadow-[6px_6px_0px_#000000] sm:shadow-[8px_8px_0px_#000000] overflow-hidden my-auto transition-transform animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Ruled Paper Red Header Strip */}
        <div className="bg-[#DE2020] text-white px-4 sm:px-6 py-2.5 flex items-center justify-between border-b-2 border-black select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest">
              CONFIDENTIAL • REFERENCE INQUIRY
            </span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="w-7 h-7 flex items-center justify-center border border-white bg-black/20 hover:bg-black text-white transition-colors cursor-pointer"
            title="Close (Esc)"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Inner Content */}
        <div className="p-5 sm:p-7 md:p-8">
          {status === 'success' ? (
            /* ================= SUCCESS STATE ================= */
            <div className="text-center py-4 sm:py-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-[#DE2020]/10 border-2 border-black flex items-center justify-center text-[#DE2020] shadow-[3px_3px_0px_#000000] mb-5">
                <Check className="w-9 h-9 stroke-[3]" />
              </div>

              <div className="inline-block px-3 py-1 bg-black text-white font-mono text-[11px] uppercase tracking-wider font-bold mb-2">
                Delivered to ombiswasatwork@gmail.com
              </div>

              <h3 className="font-sans font-black text-2xl sm:text-3xl tracking-tight text-black mt-2">
                Request Sent to Om!
              </h3>

              <p className="font-myfont text-xl sm:text-2xl text-neutral-800 tracking-wide mt-2">
                thank you, {formData.name || 'there'}!
              </p>

              <div className="mt-5 p-4 bg-neutral-50 border-2 border-black text-left text-xs font-mono shadow-[2px_2px_0px_#000000]">
                <div className="flex items-center gap-2 text-neutral-600 mb-2 font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Submission Summary:</span>
                </div>
                <div className="space-y-1 text-neutral-800">
                  <p><span className="text-neutral-500">Applicant:</span> {formData.name}</p>
                  <p><span className="text-neutral-500">Organization:</span> {formData.organization || 'N/A'}</p>
                  <p><span className="text-neutral-500">Reply Email:</span> {formData.email}</p>
                </div>
              </div>

              <p className="text-xs text-neutral-600 font-sans mt-4 max-w-md mx-auto leading-relaxed">
                Om will review your request and reply directly to <span className="font-bold text-black">{formData.email}</span> with referee details and contact authorization.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto px-8 py-3 bg-black hover:bg-[#DE2020] text-white font-sans font-bold text-sm tracking-wide border-2 border-black shadow-[4px_4px_0px_#000000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* ================= FORM STATE ================= */
            <div>
              {/* Header Titles */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-sans font-black text-2xl sm:text-3xl md:text-4xl tracking-tight text-black">
                    (6) REFERENCES
                  </span>
                  <span className="font-myfont text-2xl sm:text-3xl text-[#DE2020] lowercase">
                    upon request
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 font-sans mt-2 leading-relaxed">
                  To protect referee confidentiality, professional references are shared upon request. Enter your details and reason below — the inquiry will be delivered directly to{' '}
                  <span className="font-mono font-semibold text-black bg-neutral-100 px-1.5 py-0.5 border border-black/20">
                    ombiswasatwork@gmail.com
                  </span>.
                </p>
              </div>

              {/* Error Notice if any */}
              {status === 'error' && errorMessage && (
                <div className="mb-5 p-3.5 bg-red-50 border-2 border-black text-xs font-sans text-red-900 shadow-[3px_3px_0px_#000000] flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#DE2020] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-black">Notice:</p>
                    <p className="mt-0.5">{errorMessage}</p>
                    <a
                      href={buildMailtoUrl()}
                      className="mt-2 inline-flex items-center gap-1 font-bold underline text-[#DE2020] hover:text-black"
                    >
                      <span>Click here to send directly via your mail client</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {/* The Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 2-Column Grid: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                      Your Name <span className="text-[#DE2020]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3.5 py-2.5 bg-white border-2 border-black text-sm font-sans placeholder:text-neutral-400 focus:border-[#DE2020] focus:bg-white focus:outline-none shadow-[2px_2px_0px_#000000] transition-colors"
                      />
                      <User className="absolute right-3 top-3 w-4 h-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                      Work / Contact Email <span className="text-[#DE2020]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. sarah@studio.com"
                        className="w-full px-3.5 py-2.5 bg-white border-2 border-black text-sm font-sans placeholder:text-neutral-400 focus:border-[#DE2020] focus:bg-white focus:outline-none shadow-[2px_2px_0px_#000000] transition-colors"
                      />
                      <Mail className="absolute right-3 top-3 w-4 h-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* 2-Column Grid: Organization & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                      Company / Organization <span className="text-[#DE2020]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="organization"
                        required
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="e.g. Studio Vertex / Freelance"
                        className="w-full px-3.5 py-2.5 bg-white border-2 border-black text-sm font-sans placeholder:text-neutral-400 focus:border-[#DE2020] focus:bg-white focus:outline-none shadow-[2px_2px_0px_#000000] transition-colors"
                      />
                      <Building2 className="absolute right-3 top-3 w-4 h-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                      Your Role / Designation
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="e.g. Design Director / Hiring Manager"
                      className="w-full px-3.5 py-2.5 bg-white border-2 border-black text-sm font-sans placeholder:text-neutral-400 focus:border-[#DE2020] focus:bg-white focus:outline-none shadow-[2px_2px_0px_#000000] transition-colors"
                    />
                  </div>
                </div>

                {/* Reason for Reference */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                      Reason for Reference <span className="text-[#DE2020]">*</span>
                    </label>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      (Brief explanation)
                    </span>
                  </div>
                  <div className="relative">
                    <textarea
                      name="reason"
                      required
                      rows={3}
                      value={formData.reason}
                      onChange={handleChange}
                      placeholder="e.g. We are considering Om for a UI/UX Designer role for our new product launch, and would love to check his past collaboration and design handoff experience..."
                      className="w-full px-3.5 py-2.5 bg-white border-2 border-black text-sm font-sans placeholder:text-neutral-400 focus:border-[#DE2020] focus:bg-white focus:outline-none shadow-[2px_2px_0px_#000000] transition-colors resize-none"
                    />
                    <FileText className="absolute right-3 top-3 w-4 h-4 text-neutral-400 pointer-events-none" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <a
                    href={buildMailtoUrl()}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-black underline underline-offset-4 cursor-pointer"
                    title="Open your device's default mail application"
                  >
                    <span>Or send via email app</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2.5 bg-white hover:bg-neutral-100 text-black font-sans font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#DE2020] hover:bg-black disabled:bg-neutral-400 text-white font-sans font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending to Om...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
