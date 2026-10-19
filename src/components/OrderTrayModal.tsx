import React, { useState } from 'react';
import { MenuItem, OrderItem, RestaurantConfig } from '../types/restaurant';
import { X, Trash2, Plus, Minus, MessageCircle, AlertTriangle, Check, ExternalLink, Sparkles } from 'lucide-react';

interface OrderTrayModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearOrder: () => void;
  config: RestaurantConfig;
  onOpenClientHub: () => void;
}

export const OrderTrayModal: React.FC<OrderTrayModalProps> = ({
  isOpen,
  onClose,
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
  config,
  onOpenClientHub,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'delivery' | 'pickup' | 'dine-in'>('pickup');
  const [locationDetail, setLocationDetail] = useState('');
  const [notes, setNotes] = useState('');
  const [showConfirmationStep, setShowConfirmationStep] = useState(false);

  if (!isOpen) return null;

  // Subtotal calculation
  const subtotal = orderItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const selectedDeliveryFee =
    orderType === 'delivery' && config.deliveryAreas.length > 0 ? config.deliveryAreas[0].fee : 0;
  const estimatedTotal = subtotal + selectedDeliveryFee;

  // Build clean, professional WhatsApp text
  const buildWhatsAppMessage = () => {
    let msg = `*NEW ORDER INQUIRY — ${config.businessName}*\n`;
    msg += `--------------------------------\n`;

    if (customerName.trim()) {
      msg += `👤 *Customer:* ${customerName.trim()}\n`;
    }
    msg += `📦 *Order Type:* ${orderType.toUpperCase()}\n`;
    if (locationDetail.trim()) {
      msg += `📍 *${orderType === 'delivery' ? 'Address' : orderType === 'dine-in' ? 'Table' : 'Collection'}:* ${locationDetail.trim()}\n`;
    }
    msg += `\n*SELECTED DISHES:*\n`;

    if (orderItems.length === 0) {
      msg += `• General inquiry / Table reservation request\n`;
    } else {
      orderItems.forEach((oi, idx) => {
        msg += `${idx + 1}. *${oi.item.name}* (x${oi.quantity})\n`;
        msg += `   Price: ${config.currencySymbol}${(oi.item.price * oi.quantity).toFixed(2)}\n`;
        if (oi.specialInstructions) {
          msg += `   _Note: ${oi.specialInstructions}_\n`;
        }
      });
      msg += `\n*ESTIMATED SUB-TOTAL:* ${config.currencySymbol}${subtotal.toFixed(2)}\n`;
      if (orderType === 'delivery') {
        msg += `*ESTIMATED DELIVERY:* ${config.currencySymbol}${selectedDeliveryFee.toFixed(2)}\n`;
        msg += `*ESTIMATED TOTAL:* ${config.currencySymbol}${estimatedTotal.toFixed(2)}\n`;
      }
    }

    if (notes.trim()) {
      msg += `\n📝 *Special Instructions:* ${notes.trim()}\n`;
    }

    msg += `\n--------------------------------\n`;
    msg += `_Note: Sent from Naija Pot Website. Awaiting confirmation of food availability & payment._`;

    return msg;
  };

  const encodedMessage = encodeURIComponent(buildWhatsAppMessage());
  const rawDigits = config.whatsappNumber.replace(/[^0-9]/g, '');
  const cleanNumber = rawDigits.startsWith('0') ? '44' + rawDigits.slice(1) : rawDigits;
  const whatsAppUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  const handleLaunchWhatsApp = () => {
    // Open in new tab safely
    window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-tray-title"
    >
      <div className="w-full max-w-lg h-full bg-[#181615] border-l border-[#C6A15B]/30 flex flex-col justify-between overflow-y-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#292522] flex items-center justify-between bg-[#141211]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#6D1F2B] flex items-center justify-center text-[#E5C578] shrink-0">
              <MessageCircle className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 id="order-tray-title" className="font-display font-bold text-base sm:text-lg text-[#FFF7E8]">
                {showConfirmationStep ? 'Confirm WhatsApp Order' : 'Your Order Tray'}
              </h2>
              <p className="text-[10px] sm:text-[11px] text-[#C6A15B]">
                {orderItems.length} item{orderItems.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {orderItems.length > 0 && !showConfirmationStep && (
              <button
                onClick={onClearOrder}
                className="text-xs text-[#FFF7E8]/50 hover:text-[#C65D3B] transition-colors px-2 py-1"
                title="Clear all dishes"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#FFF7E8]/70 hover:text-[#FFF7E8] hover:bg-[#292522] transition-colors"
              aria-label="Close Order Tray"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Configuration Notice if WhatsApp Number is pending client verification */}
        {!config.isWhatsappConfigured && (
          <div className="mx-4 sm:mx-5 mt-3 sm:mt-4 p-2.5 sm:p-3 bg-[#292522] border border-[#C6A15B]/40 rounded-lg text-xs text-[#FFF7E8]/80 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold text-[#C6A15B]">Pending Client Confirmation:</span> The WhatsApp ordering
              channel is using configuration placeholder <code className="text-[#E5C578]">+{config.whatsappNumber}</code>.
              You can test the message generation or update to your real business number in settings.
            </div>
            <button
              onClick={onOpenClientHub}
              className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#6D1F2B] text-[#FFF7E8] rounded shrink-0 hover:bg-[#852535]"
            >
              Edit
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4 sm:space-y-5">
          {!showConfirmationStep ? (
            <>
              {/* Order Items List */}
              {orderItems.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#292522] flex items-center justify-center text-[#C6A15B]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-base text-[#FFF7E8]">Your Order Tray is Empty</h3>
                  <p className="text-xs text-[#FFF7E8]/60 max-w-xs mx-auto">
                    Browse our dishes in the menu and click "Add to Tray" or "Order" to build your Nigerian meal!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orderItems.map((oi) => (
                    <div
                      key={oi.item.id}
                      className="p-3.5 bg-[#141211] rounded-lg border border-[#292522] flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#FFF7E8] truncate">{oi.item.name}</p>
                        <p className="text-xs font-mono text-[#C6A15B] tabular-nums">
                          {config.currencySymbol}{oi.item.price.toFixed(2)} each
                        </p>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-[#292522] rounded-md px-2 py-1 shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(oi.item.id, -1)}
                          className="text-[#FFF7E8]/70 hover:text-[#FFF7E8] p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold font-mono tabular-nums text-[#FFF7E8] px-1">
                          {oi.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(oi.item.id, 1)}
                          className="text-[#FFF7E8]/70 hover:text-[#FFF7E8] p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(oi.item.id)}
                        className="text-[#FFF7E8]/40 hover:text-[#C65D3B] p-1 transition-colors shrink-0"
                        aria-label={`Remove ${oi.item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Order Options */}
              <div className="pt-4 border-t border-[#292522] space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A15B] font-semibold mb-2">
                    Service Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'pickup', label: 'Takeaway / Pickup' },
                      { id: 'delivery', label: 'Home Delivery' },
                      { id: 'dine-in', label: 'Dine-In Table' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setOrderType(t.id as any)}
                        className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all ${
                          orderType === t.id
                            ? 'bg-[#6D1F2B] border-[#C6A15B] text-[#FFF7E8] font-bold'
                            : 'bg-[#141211] border-[#292522] text-[#FFF7E8]/70 hover:border-[#C6A15B]/40'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer Name */}
                <div>
                  <label className="block text-xs font-medium text-[#FFF7E8]/80 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Tayo Johnson"
                    className="w-full px-3 py-2 text-xs bg-[#141211] border border-[#292522] rounded-md text-[#FFF7E8] placeholder-[#FFF7E8]/40 focus:border-[#C6A15B] focus:outline-none"
                  />
                </div>

                {/* Delivery Address or Table/Pickup Note */}
                <div>
                  <label className="block text-xs font-medium text-[#FFF7E8]/80 mb-1">
                    {orderType === 'delivery'
                      ? 'Delivery Address & Postcode'
                      : orderType === 'dine-in'
                      ? 'Table Number or Time'
                      : 'Estimated Pickup Time'}
                  </label>
                  <input
                    type="text"
                    value={locationDetail}
                    onChange={(e) => setLocationDetail(e.target.value)}
                    placeholder={
                      orderType === 'delivery'
                        ? 'e.g. 14 Victoria Road, Flat 2'
                        : orderType === 'dine-in'
                        ? 'e.g. Table 4 or Tonight 7:30 PM'
                        : 'e.g. In 30 minutes'
                    }
                    className="w-full px-3 py-2 text-xs bg-[#141211] border border-[#292522] rounded-md text-[#FFF7E8] placeholder-[#FFF7E8]/40 focus:border-[#C6A15B] focus:outline-none"
                  />
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-xs font-medium text-[#FFF7E8]/80 mb-1">
                    Kitchen Notes &amp; Spice Preference
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    placeholder="e.g. Extra pepper on Suya, mild jollof for kids, gluten allergy..."
                    className="w-full px-3 py-2 text-xs bg-[#141211] border border-[#292522] rounded-md text-[#FFF7E8] placeholder-[#FFF7E8]/40 focus:border-[#C6A15B] focus:outline-none"
                  />
                </div>
              </div>
            </>
          ) : (
            /* Confirmation Step Before Opening WhatsApp (Section 5 Requirement) */
            <div className="space-y-4">
              <div className="p-4 bg-[#141211] rounded-xl border border-[#C6A15B]/30 space-y-3">
                <div className="flex items-center gap-2 text-[#E5C578] font-semibold text-xs uppercase tracking-wider">
                  <Check className="w-4 h-4 text-[#C6A15B]" />
                  <span>Review WhatsApp Message Preview</span>
                </div>
                <div className="bg-[#1C1917] p-3 rounded-lg border border-[#292522] text-xs font-mono text-[#FFF7E8]/90 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                  {buildWhatsAppMessage()}
                </div>
                <div className="text-[11px] text-[#FFF7E8]/60 space-y-1">
                  <p>• Clicking below will launch WhatsApp click-to-chat directly with our restaurant kitchen.</p>
                  <p>• Target WhatsApp: <strong className="text-[#25D366] font-mono">{config.whatsappDisplayNumber || '07342 229865'}</strong> <span className="text-[#FFF7E8]/50">(+44 7342 229865)</span></p>
                </div>
              </div>

              {/* Clear Regulatory Disclaimer from Section 5 */}
              <div className="p-3 bg-[#6D1F2B]/30 border border-[#6D1F2B] rounded-lg text-xs text-[#FFF7E8]/80">
                <p className="font-semibold text-[#FFF7E8]">Important Order Policy:</p>
                <p className="text-[11px] mt-1 text-[#FFF7E8]/70 leading-normal">
                  Preparing this WhatsApp message does not constitute a fulfilled or paid order. Our kitchen team will
                  verify current food availability, delivery time, and payment method directly in your WhatsApp conversation.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer & Actions */}
        <div className="p-4 sm:p-5 border-t border-[#292522] bg-[#141211] space-y-3">
          {/* Subtotal preview */}
          {orderItems.length > 0 && (
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between text-[#FFF7E8]/70">
                <span>Dishes Subtotal:</span>
                <span className="font-mono tabular-nums text-[#FFF7E8]">
                  {config.currencySymbol}{subtotal.toFixed(2)}
                </span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex items-center justify-between text-[#FFF7E8]/70">
                  <span>Estimated Delivery:</span>
                  <span className="font-mono tabular-nums text-[#FFF7E8]">
                    {config.currencySymbol}{selectedDeliveryFee.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm font-bold text-[#C6A15B] pt-1 border-t border-[#292522]">
                <span>Estimated Total:</span>
                <span className="font-mono tabular-nums text-[#E5C578] text-base">
                  {config.currencySymbol}{estimatedTotal.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {!showConfirmationStep ? (
            <button
              onClick={() => setShowConfirmationStep(true)}
              disabled={orderItems.length === 0}
              className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#141211] bg-gradient-to-r from-[#C6A15B] via-[#E5C578] to-[#C6A15B] hover:from-[#E5C578] hover:to-[#C6A15B] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Continue to WhatsApp Confirmation</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowConfirmationStep(false)}
                className="py-3 px-4 text-xs font-semibold text-[#FFF7E8]/80 hover:text-[#FFF7E8] bg-[#292522] rounded-lg transition-colors"
              >
                Back to Edit
              </button>
              <button
                onClick={handleLaunchWhatsApp}
                className="flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#FFF7E8] bg-[#25D366] hover:bg-[#20ba59] rounded-lg shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current text-white" />
                <span>Open in WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
