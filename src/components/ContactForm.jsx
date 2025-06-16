import { useState, useRef, useEffect } from 'react';
import { pricingService } from '../services/appService';

const ContactForm = () => {
    const [form, setForm] = useState({ customer_name: '', customer_phone: '', content: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cooldown, setCooldown] = useState(false);
    const timeoutRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting || cooldown) return;
        if (!form.customer_name || !form.customer_phone || !form.content) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }
        setError('');
        setSuccess('');
        setIsSubmitting(true);
        try {
            const params = {
                customer_name: form.customer_name,
                customer_phone: form.customer_phone,
                content: form.content,
                locale: 'vi'
            };
            await pricingService.savePricing({ ...params });
            setSuccess('Gửi liên hệ thành công!');
            setForm({ customer_name: '', customer_phone: '', content: '' });
            setCooldown(true);
            timeoutRef.current = setTimeout(() => {
                setCooldown(false);
                setSuccess('');
            }, 10000); // 10 giây cooldown
        } catch {
            setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className="p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Liên hệ tư vấn</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Họ tên</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={form.customer_name}
                        onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))}
                        placeholder="Nhập họ tên của bạn"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Số điện thoại</label>
                    <input
                        type="tel"
                        className="w-full border rounded px-3 py-2"
                        value={form.customer_phone}
                        onChange={e => setForm(f => ({ ...f, customer_phone: e.target.value }))}
                        placeholder="Nhập số điện thoại"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Nội dung</label>
                    <textarea
                        className="w-full border rounded px-3 py-2"
                        value={form.content}
                        onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                        placeholder="Nhập nội dung liên hệ"
                        rows={4}
                    />
                </div>
                {error && <div className="text-red-500 mb-2">{error}</div>}
                {success && <div className="text-green-600 mb-2">{success}</div>}
                <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting || cooldown}>
                    {isSubmitting ? 'Đang gửi...' : cooldown ? 'Vui lòng chờ...' : 'Gửi liên hệ'}
                </button>
            </form>
        </div>
    );
};

export default ContactForm; 