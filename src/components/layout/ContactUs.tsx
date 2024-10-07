import Link from "next/link"

const ContactUs = () => {
  return (
    <section className="text-center my-8" id="contact">
    <p>Don't hesitate</p>
    <p>Contact us</p>
    <div className="mt-8">
      <Link className="text-4xl underline text-gray-500" href="tel:+46738123123">
        +46 738 123 123
      </Link>
    </div>
  </section>
  )
}

export default ContactUs