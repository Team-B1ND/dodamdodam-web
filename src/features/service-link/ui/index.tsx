import { colors } from "@b1nd/dodam-design-system/colors";
import { ChevronRight } from "@b1nd/dodam-design-system/icons";
import { SERVICE_LINKS } from "../constants/link";

const ServiceLink = () => {
  return (
    <aside className="flex flex-col w-70 min-w-70 max-md:w-full h-fit gap-3 small-container">
      <p className="text-headline font-bold text-text-primary">
        B1ND의 다른 서비스
      </p>
      <hr className="border-border-subtle" />
      <div className="flex flex-col gap-1.5">
        {SERVICE_LINKS.map((service, idx) => (
          <div key={service.href} className="flex flex-col gap-1.5">
            {idx !== 0 && <hr className="border-border-subtle" />}
            <a
              href={service.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-2 pr-2.5"
            >
              <div className="flex flex-col min-w-0">
                <span className="text-body1 font-semibold text-text-primary truncate">
                  {service.name}
                </span>
                <span className="text-caption2 font-medium text-text-tertiary truncate">
                  {service.description}
                </span>
              </div>
              <ChevronRight color={colors.text.primary} size={16} pointer />
            </a>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ServiceLink;
